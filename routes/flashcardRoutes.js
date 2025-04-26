import express from 'express';
import db from '../config/db.js';
import { showFlashcards, addFlashcard } from '../controllers/flashcardController.js';

const router = express.Router();

// Show All Flashcards
router.get('/', showFlashcards);

// Show Add Flashcard Form
router.get('/add', (req, res) => {
  res.render('flashcards/addFlashcard', { title: 'Add Flashcard' });
});

router.get('/study', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM flashcards');
      const flashcards = result.rows;
      res.render('flashcards/study', { flashcards });
    } catch (err) {
      console.error('Error fetching flashcards for study:', err);
      res.status(500).send('Server Error');
    }
  });  
  

// Handle Add Flashcard Submission
router.post('/add', addFlashcard);

// Delete Flashcard
router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM flashcards WHERE id = $1', [id]);
    res.redirect('/flashcards');
  } catch (err) {
    console.error('Error deleting flashcard:', err);
    res.render('error', { message: 'Failed to delete flashcard.' });
  }
});

// Show Edit Flashcard Form
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM flashcards WHERE id = $1', [id]);
    const flashcard = result.rows[0];
    if (!flashcard) {
      return res.status(404).send('Flashcard not found');
    }
    res.render('flashcards/edit', { flashcard });
  } catch (err) {
    console.error('Error loading flashcard for edit:', err);
    res.status(500).send('Server Error');
  }
});

// Handle Edit Form Submission
router.post('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const { front, back } = req.body;
  try {
    await db.query('UPDATE flashcards SET front = $1, back = $2 WHERE id = $3', [front, back, id]);
    res.redirect('/flashcards');
  } catch (err) {
    console.error('Error updating flashcard:', err);
    res.status(500).send('Server Error');
  }
});

export default router;
