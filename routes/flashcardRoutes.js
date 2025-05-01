import express from 'express';
import {
  showFlashcards,
  addFlashcard,
  deleteFlashcard,
  showEditForm,
  updateFlashcard,
  showStudyPage
} from '../controllers/flashcardController.js';

const router = express.Router();

router.get('/', showFlashcards);
router.get('/add', (req, res) => {
  res.render('flashcards/addFlashcard', { title: 'Add Flashcard' });
});
router.get('/study', showStudyPage);
router.post('/add', addFlashcard);
router.post('/delete/:id', deleteFlashcard);
router.get('/:id/edit', showEditForm);
router.post('/:id/edit', updateFlashcard);

export default router;
