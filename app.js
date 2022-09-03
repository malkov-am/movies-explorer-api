require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createUser, login } = require('./controllers/users');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
const { PORT = 3000 } = process.env;

// Middlewares
app.use(bodyParser.json());

// Логгер запросов

// Маршруты, не требующие аутентификации
app.use('/signup', createUser);
app.use('/signin', login);

// Защищенные маршруты
app.use('/users', require('./routes/users'));

// Неправильный URL

// Логгер ошибок

// Обработчик ошибок celebrate

// Централизованный обработчик ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(PORT);
console.log(`Server is started at port: ${PORT}`);
