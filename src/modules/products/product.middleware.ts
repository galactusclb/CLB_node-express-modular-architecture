import { body } from 'express-validator';

export const validateProduct = [
    body('name').isString().withMessage('Name must be a string'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').isString().withMessage('Description must be a string'),
];