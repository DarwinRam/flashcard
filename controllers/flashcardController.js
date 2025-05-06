import {
  getAllFlashcards,
  createFlashcard,
  deleteFlashcardById,
  getFlashcardById,
  updateFlashcardById
} from '../models/flashcardModel.js';

export async function showFlashcards(req, res) {
  try {
    const flashcards = await getAllFlashcards();
    res.render('flashcards', { title: 'Flashcards', flashcards });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error fetching flashcards' });
  }
}

export async function addFlashcard(req, res) {
  const { front, back } = req.body;
  const errors = [];

  // Validation
  if (!front || front.trim() === "") {
    errors.push("Front (Question/Term) is required.");
  }
  if (!back || back.trim() === "") {
    errors.push("Back (Answer/Definition) is required.");
  }

  if (errors.length > 0) {
    return res.status(400).render('flashcards/addFlashcard', {
      errors,
      front,
      back
    });
  }

  try {
    await createFlashcard(front, back);
    res.redirect('/flashcards');
  } catch (error) {
    console.error(error);
    res.status(500).render('flashcards/add', {
      errors: ['Error creating flashcard. Please try again.'],
      front,
      back
    });
  }
}


export async function deleteFlashcard(req, res) {
  const { id } = req.params;
  try {
    await deleteFlashcardById(id);
    res.redirect('/flashcards');
  } catch (err) {
    console.error('Error deleting flashcard:', err);
    res.render('error', { message: 'Failed to delete flashcard.' });
  }
}

export async function showEditForm(req, res) {
  const { id } = req.params;
  try {
    const flashcard = await getFlashcardById(id);
    if (!flashcard) {
      return res.status(404).send('Flashcard not found');
    }
    res.render('flashcards/edit', { flashcard });
  } catch (err) {
    console.error('Error loading flashcard for edit:', err);
    res.status(500).send('Server Error');
  }
}

export async function updateFlashcard(req, res) {
  const { id } = req.params;
  const { front, back } = req.body;
  try {
    await updateFlashcardById(id, front, back);
    res.redirect('/flashcards');
  } catch (err) {
    console.error('Error updating flashcard:', err);
    res.status(500).send('Server Error');
  }
}

export async function showStudyPage(req, res) {
  try {
    const flashcards = await getAllFlashcards();
    res.render('flashcards/study', { flashcards });
  } catch (err) {
    console.error('Error fetching flashcards for study:', err);
    res.status(500).send('Server Error');
  }
}
