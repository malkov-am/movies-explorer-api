require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const { errorHandler } = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
const { PORT = 3000 } = process.env;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Логгер запросов
app.use(requestLogger);

// Маршруты, не требующие аутентификации
app.use('/signup', createUser);
app.use('/signin', login);

// Защищенные маршруты
app.use(require('./middlewares/auth'));
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

// Неправильный URL
app.use('*', (req, res, next) => {
  next(new NotFoundError({ message: 'Ресурс не найден. Проверьте URL и метод запроса.' }));
});

// Логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate

// Централизованный обработчик ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT);
console.log(`Server is started at port: ${PORT}`);
