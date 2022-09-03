require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
const { PORT = 3000 } = process.env;

// Middlewares

// Логгер запросов

// Маршруты, не требующие аутентификации

// Защищенные маршруты

// Неправильный URL

// Логгер ошибок

// Обработчик ошибок celebrate

// Централизованный обработчик ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT);
console.log(`Server is started at port: ${PORT}`);
