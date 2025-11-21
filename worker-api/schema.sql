-- Likes table
CREATE TABLE IF NOT EXISTS likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  artwork_id INTEGER NOT NULL,
  user_identifier TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(artwork_id, user_identifier)
);

-- Index for faster artwork queries
CREATE INDEX IF NOT EXISTS idx_likes_artwork ON likes(artwork_id);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  artwork_id INTEGER NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT,
  comment_text TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_approved INTEGER DEFAULT 1
);

-- Index for faster artwork queries
CREATE INDEX IF NOT EXISTS idx_comments_artwork ON comments(artwork_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(is_approved);
