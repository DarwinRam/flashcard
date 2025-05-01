import pool from '../config/db.js';

export async function getAllFlashcards() {
  const { rows } = await pool.query('SELECT * FROM flashcards ORDER BY id ASC');
  return rows;
}

export async function createFlashcard(front, back) {
  const { rows } = await pool.query(
    'INSERT INTO flashcards (front, back) VALUES ($1, $2) RETURNING *',
    [front, back]
  );
  return rows[0];
}

export async function deleteFlashcardById(id) {
  await pool.query('DELETE FROM flashcards WHERE id = $1', [id]);
}

export async function getFlashcardById(id) {
  const result = await pool.query('SELECT * FROM flashcards WHERE id = $1', [id]);
  return result.rows[0];
}

export async function updateFlashcardById(id, front, back) {
  await pool.query('UPDATE flashcards SET front = $1, back = $2 WHERE id = $3', [front, back, id]);
}
