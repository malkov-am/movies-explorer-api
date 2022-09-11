const { celebrate, Joi } = require('celebrate');

// Кастомная валидация mongoose id
function validateId(id, helper) {
  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    return id;
  }
  return helper.message('Передан некорретный id.');
}

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле E-mail обязательно для заполнения.',
        'string.email': 'Некорректный адрес электронной почты.',
      }),
    password: Joi.string().required().min(6).max(30)
      .messages({
        'any.required': 'Поле Пароль обязательно для заполнения.',
        'string.min': 'Поле Пароль не должно быть короче 6 символов.',
        'string.max': 'Поле Пароль не должно быть длиннее 30 символов.',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле Имя обязательно для заполнения.',
        'string.min': 'Поле Имя не должно быть короче 2 символов.',
        'string.max': 'Поле Имя не должно быть длиннее 30 символов.',
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Поле E-mail обязательно для заполнения.',
      'string.email': 'Некорректный адрес электронной почты.',
    }),
    password: Joi.string().required().min(6).max(30)
      .messages({
        'any.required': 'Поле Пароль обязательно для заполнения.',
        'string.min': 'Поле Пароль не должно быть короче 6 символов.',
        'string.max': 'Поле Пароль не должно быть длиннее 30 символов.',
      }),
  }),
});

const validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле E-mail обязательно для заполнения.',
        'string.email': 'Некорректный адрес электронной почты.',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле Имя обязательно для заполнения.',
        'string.min': 'Поле Имя не должно быть короче 2 символов.',
        'string.max': 'Поле Имя не должно быть длиннее 30 символов.',
      }),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailerLink: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom(validateId)
      .messages({
        'any.required': 'Не передан id удаляемого фильма.',
        'string.custom': 'Некорректный id фильма.',
      }),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateUserInfo,
  validateCreateMovie,
  validateDeleteMovie,
};
