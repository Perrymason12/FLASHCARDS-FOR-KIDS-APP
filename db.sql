-- Run this in MySQL to set up the database
CREATE DATABASE IF NOT EXISTS flashcards_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE flashcards_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flashcards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  tag VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Optional seed user (password: password123). Remove in production.
-- INSERT INTO users (name, email, password_hash)
-- VALUES ('Demo Teacher', 'teacher@example.com', '$2b$12$n9mvV0A4m6JZg8.3rzFzFeo7m3p8xT8J4yV8iH3p11lQGq2vV8e8a');
-- SELECT * FROM users;
