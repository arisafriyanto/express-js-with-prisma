import bookService from '../services/bookService.js';

const list = async (req, res, next) => {
    try {
        const result = await bookService.list();
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const createBorrowBook = async (req, res, next) => {
    try {
        const request = req.body;
        const memberCode = req.params.memberCode;
        const bookCode = req.params.bookCode;

        const result = await bookService.createBorrowBook(memberCode, bookCode, request);

        const [, borrowingCreateResult] = result;

        res.status(200).json({
            data: borrowingCreateResult,
        });
    } catch (error) {
        next(error);
    }
};

const updateBorrowBook = async (req, res, next) => {
    try {
        const request = req.body;
        const memberCode = req.params.memberCode;
        const bookCode = req.params.bookCode;

        const result = await bookService.updateBorrowBook(memberCode, bookCode, request);

        const [, borrowingUpdateResult] = result;

        res.status(200).json({
            data: borrowingUpdateResult,
        });
    } catch (error) {
        next(error);
    }
};

export default { list, createBorrowBook, updateBorrowBook };
