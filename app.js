require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;
const { DB = 'mongodb://localhost:27017/moviesdb' } = process.env;
mongoose.connect(DB);

const limiter = rateLimit();

// Боди-парсер
app.use(bodyParser.json());

// CORS
app.use(cors());

// Логгер запросов
app.use(requestLogger);

// Лимитер запросов
app.use(limiter);

// Роуты
app.use('/', routes);

// Логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT);
