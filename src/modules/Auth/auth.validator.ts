import { body } from 'express-validator';

export const validateRegister = [
    body('email').trim().notEmpty(),
    body('userName').trim().notEmpty(),
    body('password').trim().notEmpty(),
];

export const validateLogin = [
    body('userName').trim().notEmpty().withMessage('UserName is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),
];