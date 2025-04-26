// controllers/flashcardController.js
import { getAllFlashcards, createFlashcard } from '../models/flashcardModel.js';

// Show all flashcards
export async function showFlashcards(req, res) {
  try {
    const flashcards = await getAllFlashcards();
    res.render('flashcards', { title: 'Flashcards', flashcards });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error fetching flashcards' });
  }
}

// Create a new flashcard
export async function addFlashcard(req, res) {
  const { front, back } = req.body;

  if (!front || !back) {
    return res.status(400).render('error', { message: 'Front and Back text are required!' });
  }

  try {
    await createFlashcard(front, back);
    res.redirect('/flashcards');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error creating flashcard' });
  }
}
