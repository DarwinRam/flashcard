// models/flashcardModel.js
import pool from '../config/db.js';

// Get all flashcards
export async function getAllFlashcards() {
  const { rows } = await pool.query('SELECT * FROM flashcards ORDER BY id ASC');
  return rows;
}

// Create a new flashcard
export async function createFlashcard(front, back) {
  const { rows } = await pool.query(
    'INSERT INTO flashcards (front, back) VALUES ($1, $2) RETURNING *',
    [front, back]
  );
  return rows[0];
}
