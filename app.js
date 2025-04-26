import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import flashcardRoutes from './routes/flashcardRoutes.js';
import methodOverride from 'method-override';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

// Routes
app.use('/flashcards', flashcardRoutes);
// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Flashcard App' });
});


// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
