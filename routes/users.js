const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');

// Возвращает информацию о пользователе (email и имя)
router.get('/me', getUserInfo);
// Обновляет информацию о пользователе (email и имя)
router.patch('/me', updateUserInfo);

module.exports = router;
