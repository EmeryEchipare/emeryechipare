/**
 * Cloudflare Worker API for Emery Echipare artwork engagement
 * Handles likes and comments with D1 database storage
 */

// CORS headers - allow requests from production domain and dev server
function getCorsHeaders(origin) {
  const allowedOrigins = [
    'https://emeryechipare.com',
    'https://emeryechipare.pages.dev',
    'http://localhost:3000'
  ];
  
  // Check if origin matches any allowed origin or subdomain
  const isAllowed = allowedOrigins.some(allowed => 
    origin === allowed || origin?.endsWith('.emeryechipare.pages.dev')
  );
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

// Helper to get user identifier (IP-based for now)
function getUserIdentifier(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  return `ip:${ip}`;
}

// Helper to format response
function jsonResponse(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...getCorsHeaders(origin),
    },
  });
}

// Handle CORS preflight
function handleOptions(origin) {
  return new Response(null, {
    headers: getCorsHeaders(origin),
  });
}

// GET /artwork/:id/likes - Get like count for artwork
async function getLikes(env, artworkId, origin) {
  try {
    const result = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM likes WHERE artwork_id = ?'
    )
      .bind(artworkId)
      .first();

    return jsonResponse({ likes: result.count || 0 }, 200, origin);
  } catch (error) {
    console.error('Error getting likes:', error);
    return jsonResponse({ error: 'Failed to get likes' }, 500, origin);
  }
}

// POST /artwork/:id/like - Toggle like for artwork
async function toggleLike(env, request, artworkId, origin) {
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
      }, 200, origin);
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
      }, 200, origin);
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return jsonResponse({ error: 'Failed to toggle like' }, 500, origin);
  }
}

// GET /artwork/:id/liked - Check if user liked artwork
async function checkLiked(env, request, artworkId, origin) {
  try {
    const userIdentifier = getUserIdentifier(request);

    const result = await env.DB.prepare(
      'SELECT id FROM likes WHERE artwork_id = ? AND user_identifier = ?'
    )
      .bind(artworkId, userIdentifier)
      .first();

    return jsonResponse({ liked: !!result }, 200, origin);
  } catch (error) {
    console.error('Error checking liked:', error);
    return jsonResponse({ error: 'Failed to check liked status' }, 500, origin);
  }
}

// GET /artwork/:id/comments - Get comments for artwork
async function getComments(env, artworkId, origin) {
  try {
    const { results } = await env.DB.prepare(
      'SELECT id, author_name, comment_text, created_at FROM comments WHERE artwork_id = ? AND is_approved = 1 ORDER BY created_at DESC'
    )
      .bind(artworkId)
      .all();

    return jsonResponse({ comments: results || [] }, 200, origin);
  } catch (error) {
    console.error('Error getting comments:', error);
    return jsonResponse({ error: 'Failed to get comments' }, 500, origin);
  }
}

// POST /artwork/:id/comment - Add comment to artwork
async function addComment(env, request, artworkId, origin) {
  try {
    const body = await request.json();
    const { name, email, comment } = body;

    // Validation
    if (!name || !comment) {
      return jsonResponse({ error: 'Name and comment are required' }, 400, origin);
    }

    if (name.length > 100) {
      return jsonResponse({ error: 'Name too long (max 100 characters)' }, 400, origin);
    }

    if (comment.length > 1000) {
      return jsonResponse({ error: 'Comment too long (max 1000 characters)' }, 400, origin);
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
    }, 200, origin);
  } catch (error) {
    console.error('Error adding comment:', error);
    return jsonResponse({ error: 'Failed to add comment' }, 500, origin);
  }
}

// Main request handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const origin = request.headers.get('Origin');

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions(origin);
    }

    // Parse route
    const artworkMatch = path.match(/^\/artwork\/(\d+)\/(likes|liked|like|comments|comment)$/);

    if (!artworkMatch) {
      return jsonResponse({ error: 'Not found' }, 404, origin);
    }

    const artworkId = parseInt(artworkMatch[1]);
    const action = artworkMatch[2];

    // Route to appropriate handler
    if (action === 'likes' && request.method === 'GET') {
      return getLikes(env, artworkId, origin);
    }

    if (action === 'liked' && request.method === 'GET') {
      return checkLiked(env, request, artworkId, origin);
    }

    if (action === 'like' && request.method === 'POST') {
      return toggleLike(env, request, artworkId, origin);
    }

    if (action === 'comments' && request.method === 'GET') {
      return getComments(env, artworkId, origin);
    }

    if (action === 'comment' && request.method === 'POST') {
      return addComment(env, request, artworkId, origin);
    }

    return jsonResponse({ error: 'Method not allowed' }, 405, origin);
  },
};
