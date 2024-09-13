import Joi from 'joi';

const createBorrowValidation = Joi.object({
    borrowDate: Joi.date().required(),
});

const returnBorrowValidation = Joi.object({
    returnDate: Joi.date().required(),
});

export { createBorrowValidation, returnBorrowValidation };
