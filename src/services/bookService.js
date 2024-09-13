import { prismaClient } from '../application/database.js';
import { ResponseError } from '../errors/responseError.js';
import { validate } from '../validations/validation.js';
import { createBorrowValidation, returnBorrowValidation } from '../validations/bookValidation.js';

const list = async () => {
    const borrowedBooks = await prismaClient.borrowing.findMany({
        where: {
            returnDate: null,
        },
        select: {
            bookCode: true,
        },
    });

    const borrowedBookCodes = borrowedBooks.map((b) => b.bookCode);

    return prismaClient.book.findMany({
        where: {
            stock: {
                gt: 0,
            },
            code: {
                notIn: borrowedBookCodes,
            },
        },
        select: {
            code: true,
            title: true,
            stock: true,
        },
    });
};

const checkMember = async (memberCode, requestDate) => {
    let member = await prismaClient.member.findUnique({
        where: { code: memberCode },
    });

    if (!member) {
        throw new ResponseError(404, 'Member is not found');
    }

    const latestBorrowing = await prismaClient.borrowing.findFirst({
        where: {
            memberCode,
            returnDate: {
                not: null,
            },
        },
        orderBy: {
            returnDate: 'desc',
        },
    });

    if (latestBorrowing) {
        const dates = new Date(requestDate);
        const returnDate = new Date(latestBorrowing.returnDate);
        const daysSinceReturn = Math.floor((dates - returnDate) / (1000 * 60 * 60 * 24));

        if (daysSinceReturn > 3) {
            member = await prismaClient.member.update({
                where: { code: memberCode },
                data: { penalty: false },
            });
        }
    }

    if (member.penalty) {
        throw new ResponseError(400, 'Member is under penalty');
    }
};

const checkBook = async (bookCode) => {
    const book = await prismaClient.book.findUnique({
        where: { code: bookCode },
    });

    if (!book) {
        throw new ResponseError(404, 'Book is not found');
    }

    if (book.stock <= 0) {
        throw new ResponseError(400, 'Book is out of stock');
    }

    return book;
};

const checkBorrowed = async (memberCode, bookCode) => {
    const borrowedBooks = await prismaClient.borrowing.findMany({
        where: {
            memberCode: memberCode,
            returnDate: null,
        },
        select: {
            bookCode: true,
        },
    });

    if (borrowedBooks.length >= 2) {
        throw new ResponseError(400, 'Member has already borrowed 2 books');
    }

    const hasBorrowedSameBook = borrowedBooks.some((borrowing) => borrowing.bookCode === bookCode);

    if (hasBorrowedSameBook) {
        throw new ResponseError(
            400,
            'Member has already borrowed this book and has not returned it'
        );
    }
};

const createBorrowBook = async (memberCode, bookCode, request) => {
    const borrow = validate(createBorrowValidation, request);
    bookCode = bookCode.toUpperCase();
    memberCode = memberCode.toUpperCase();

    await checkMember(memberCode, borrow.borrowDate);
    await checkBorrowed(memberCode, bookCode);
    await checkBook(bookCode);

    const borrowData = {
        ...borrow,
        memberCode,
        bookCode,
    };

    return await prismaClient.$transaction([
        prismaClient.book.update({
            where: { code: bookCode },
            data: { stock: { decrement: 1 } },
        }),
        prismaClient.borrowing.create({
            data: borrowData,
            select: {
                id: true,
                memberCode: true,
                bookCode: true,
                borrowDate: true,
            },
        }),
    ]);
};

const updateBorrowBook = async (memberCode, bookCode, request) => {
    const { returnDate } = validate(returnBorrowValidation, request);
    bookCode = bookCode.toUpperCase();
    memberCode = memberCode.toUpperCase();

    const borrowing = await prismaClient.borrowing.findFirst({
        where: {
            memberCode,
            bookCode,
            returnDate: null,
        },
    });

    if (!borrowing) {
        throw new ResponseError(404, 'Borrowing record not found');
    }

    if (borrowing) {
        if (new Date(borrowing.borrowDate) > new Date(returnDate)) {
            throw new ResponseError(400, 'Borrowing date cannot be later than return date');
        }
    }

    const daysLate = Math.max(
        0,
        Math.floor(
            (new Date(returnDate) - new Date(borrowing.borrowDate)) / (1000 * 60 * 60 * 24)
        ) - 7
    );

    if (daysLate > 0) {
        await prismaClient.member.update({
            where: { code: memberCode },
            data: { penalty: true },
        });
    }

    const borrowData = {
        returnDate,
        fine: daysLate * 1000,
        returned: true,
    };

    return await prismaClient.$transaction([
        prismaClient.book.update({
            where: { code: bookCode },
            data: { stock: { increment: 1 } },
        }),
        prismaClient.borrowing.update({
            where: {
                id: borrowing.id,
            },
            data: borrowData,
            select: {
                id: true,
                memberCode: true,
                bookCode: true,
                borrowDate: true,
                returnDate: true,
                fine: true,
                returned: true,
            },
        }),
    ]);
};

export default { list, createBorrowBook, updateBorrowBook };
