import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const projectCreateValidation = [
  body("title", "Write title of your project").isLength({ min: 4 }).isString(),
  body("description", "Description need to be at lest 200 characters").isLength({ min: 200 }).isString(),
  body("tags", "Set any tags").optional().isString(),
  body("moneyGoal", "Set money goal of your project").isLength({ min: 1 }),
  body("timeGoal", "Set time goal of your project"),
  body("imageUrl", "URL is not correct").optional().isString(),
  body("videoUrl", "URL is not correct").optional().isString(),
];
