const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// Возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);
// Создаёт фильм
router.post('/', createMovie);
// Удаляет сохранённый фильм по id
router.delete('/:movieId', deleteMovie);

module.exports = router;