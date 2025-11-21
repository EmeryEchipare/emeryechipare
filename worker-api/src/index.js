/**
 * Cloudflare Worker API for Emery Echipare artwork engagement
 * Handles likes and comments with D1 database storage
 */

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Will be restricted in production
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

// Helper to get user identifier (IP-based for now)
function getUserIdentifier(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  return `ip:${ip}`;
}

// Helper to format response
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

// Handle CORS preflight
function handleOptions() {
  return new Response(null, {
    headers: corsHeaders,
  });
}

// GET /artwork/:id/likes - Get like count for artwork
async function getLikes(env, artworkId) {
  try {
    const result = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM likes WHERE artwork_id = ?'
    )
      .bind(artworkId)
      .first();

    return jsonResponse({ likes: result.count || 0 });
  } catch (error) {
    console.error('Error getting likes:', error);
    return jsonResponse({ error: 'Failed to get likes' }, 500);
  }
}

// POST /artwork/:id/like - Toggle like for artwork
async function toggleLike(env, request, artworkId) {
  try {
    const userIdentifier = getUserIdentifier(request);

    // Check if user already liked
    const existing = await env.DB.prepare(
      'SELECT id FROM likes WHERE artwork_id = ? AND user_identifier = ?'
    )
      .bind(artworkId, userIdentifier)
      .first();

    if (existing) {
      // Unlike
      await env.DB.prepare(
        'DELETE FROM likes WHERE artwork_id = ? AND user_identifier = ?'
      )
        .bind(artworkId, userIdentifier)
        .run();

      const count = await env.DB.prepare(
        'SELECT COUNT(*) as count FROM likes WHERE artwork_id = ?'
      )
        .bind(artworkId)
        .first();

      return jsonResponse({
        liked: false,
        likes: count.count || 0,
      });
    } else {
      // Like
      await env.DB.prepare(
        'INSERT INTO likes (artwork_id, user_identifier) VALUES (?, ?)'
      )
        .bind(artworkId, userIdentifier)
        .run();

      const count = await env.DB.prepare(
        'SELECT COUNT(*) as count FROM likes WHERE artwork_id = ?'
      )
        .bind(artworkId)
        .first();

      return jsonResponse({
        liked: true,
        likes: count.count || 0,
      });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return jsonResponse({ error: 'Failed to toggle like' }, 500);
  }
}

// GET /artwork/:id/liked - Check if user liked artwork
async function checkLiked(env, request, artworkId) {
  try {
    const userIdentifier = getUserIdentifier(request);

    const result = await env.DB.prepare(
      'SELECT id FROM likes WHERE artwork_id = ? AND user_identifier = ?'
    )
      .bind(artworkId, userIdentifier)
      .first();

    return jsonResponse({ liked: !!result });
  } catch (error) {
    console.error('Error checking liked:', error);
    return jsonResponse({ error: 'Failed to check liked status' }, 500);
  }
}

// GET /artwork/:id/comments - Get comments for artwork
async function getComments(env, artworkId) {
  try {
    const { results } = await env.DB.prepare(
      'SELECT id, author_name, comment_text, created_at FROM comments WHERE artwork_id = ? AND is_approved = 1 ORDER BY created_at DESC'
    )
      .bind(artworkId)
      .all();

    return jsonResponse({ comments: results || [] });
  } catch (error) {
    console.error('Error getting comments:', error);
    return jsonResponse({ error: 'Failed to get comments' }, 500);
  }
}

// POST /artwork/:id/comment - Add comment to artwork
async function addComment(env, request, artworkId) {
  try {
    const body = await request.json();
    const { name, email, comment } = body;

    // Validation
    if (!name || !comment) {
      return jsonResponse({ error: 'Name and comment are required' }, 400);
    }

    if (name.length > 100) {
      return jsonResponse({ error: 'Name too long (max 100 characters)' }, 400);
    }

    if (comment.length > 1000) {
      return jsonResponse({ error: 'Comment too long (max 1000 characters)' }, 400);
    }

    // Basic spam check - rate limiting would go here
    // For now, just insert
    const result = await env.DB.prepare(
      'INSERT INTO comments (artwork_id, author_name, author_email, comment_text) VALUES (?, ?, ?, ?)'
    )
      .bind(artworkId, name, email || null, comment)
      .run();

    // Get the newly created comment
    const newComment = await env.DB.prepare(
      'SELECT id, author_name, comment_text, created_at FROM comments WHERE id = ?'
    )
      .bind(result.meta.last_row_id)
      .first();

    return jsonResponse({
      success: true,
      comment: newComment,
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    return jsonResponse({ error: 'Failed to add comment' }, 500);
  }
}

// Main request handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    // Parse route
    const artworkMatch = path.match(/^\/artwork\/(\d+)\/(likes|liked|like|comments|comment)$/);

    if (!artworkMatch) {
      return jsonResponse({ error: 'Not found' }, 404);
    }

    const artworkId = parseInt(artworkMatch[1]);
    const action = artworkMatch[2];

    // Route to appropriate handler
    if (action === 'likes' && request.method === 'GET') {
      return getLikes(env, artworkId);
    }

    if (action === 'liked' && request.method === 'GET') {
      return checkLiked(env, request, artworkId);
    }

    if (action === 'like' && request.method === 'POST') {
      return toggleLike(env, request, artworkId);
    }

    if (action === 'comments' && request.method === 'GET') {
      return getComments(env, artworkId);
    }

    if (action === 'comment' && request.method === 'POST') {
      return addComment(env, request, artworkId);
    }

    return jsonResponse({ error: 'Method not allowed' }, 405);
  },
};
