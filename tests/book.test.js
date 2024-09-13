import supertest from 'supertest';
import {
    createTestBook,
    createTestBorrowBook,
    createTestMember,
    getTestBook,
    getTestMember,
    removeAllTestBorrowings,
    removeTestBook,
    removeTestMember,
} from './testUtils.js';
import { app } from '../src/application/app.js';

describe('GET /api/books', () => {
    beforeEach(async () => {
        await createTestBook();
    });

    afterEach(async () => {
        await removeTestBook();
    });

    it('should can get books', async () => {
        const result = await supertest(app).get('/api/books');

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.errors).toBeUndefined();
    });
});

describe('POST /api/books/:bookCode/borrowings/:memberCode', () => {
    beforeEach(async () => {
        await createTestMember();
        await createTestBook();
    });

    afterEach(async () => {
        await removeAllTestBorrowings();
        await removeTestMember();
        await removeTestBook();
    });

    it('should can create borrow book', async () => {
        const testMember = await getTestMember();
        let testBook = await getTestBook();

        const result = await supertest(app)
            .post(`/api/books/${testBook.code}/borrowings/${testMember.code}`)
            .send({
                borrowDate: '2024-09-13T00:00:00.000Z',
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.memberCode).toBe(testMember.code);
        expect(result.body.data.bookCode).toBe(testBook.code);
        expect(result.body.data.borrowDate).toBe('2024-09-13T00:00:00.000Z');

        testBook = await getTestBook();
        expect(testBook.stock).toBe(0);
    });

    it('should reject if member is not found', async () => {
        const testMember = await getTestMember();
        const testBook = await getTestBook();

        const result = await supertest(app)
            .post(`/api/books/${testBook.code}BB/borrowings/${testMember.code}`)
            .send({
                borrowDate: '2024-09-13T00:00:00.000Z',
            });

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if book is not found', async () => {
        const testMember = await getTestMember();
        const testBook = await getTestBook();

        const result = await supertest(app)
            .post(`/api/books/${testBook.code}/borrowings/${testMember.code}MM`)
            .send({
                borrowDate: '2024-09-13T00:00:00.000Z',
            });

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if the member borrows the same book again', async () => {
        const testMember = await getTestMember();
        const testBook = await getTestBook();

        await supertest(app)
            .post(`/api/books/${testBook.code}/borrowings/${testMember.code}`)
            .send({
                borrowDate: '2024-09-13T00:00:00.000Z',
            });

        const result = await supertest(app)
            .post(`/api/books/${testBook.code}/borrowings/${testMember.code}`)
            .send({
                borrowDate: '2024-09-15T00:00:00.000Z',
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('PATCH /api/books/:bookCode/borrowings/:memberCode', () => {
    beforeEach(async () => {
        await createTestMember();
        await createTestBook();
        await createTestBorrowBook();
    });

    afterEach(async () => {
        await removeAllTestBorrowings();
        await removeTestMember();
        await removeTestBook();
    });

    it('should can return borrow book', async () => {
        const testMember = await getTestMember();
        let testBook = await getTestBook();

        const result = await supertest(app)
            .patch(`/api/books/${testBook.code}/borrowings/${testMember.code}`)
            .send({
                returnDate: '2024-09-20T00:00:00.000Z',
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.memberCode).toBe(testMember.code);
        expect(result.body.data.bookCode).toBe(testBook.code);
        expect(result.body.data.borrowDate).toBe('2024-09-13T00:00:00.000Z');
        expect(result.body.data.returnDate).toBe('2024-09-20T00:00:00.000Z');
        expect(result.body.data.fine).toBe(0);
        expect(result.body.data.returned).toBe(true);

        testBook = await getTestBook();
        expect(testBook.stock).toBe(2);
    });

    it('should can return borrow book, but late', async () => {
        const testMember = await getTestMember();
        const testBook = await getTestBook();

        const result = await supertest(app)
            .patch(`/api/books/${testBook.code}/borrowings/${testMember.code}`)
            .send({
                returnDate: '2024-09-22T00:00:00.000Z',
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.memberCode).toBe(testMember.code);
        expect(result.body.data.bookCode).toBe(testBook.code);
        expect(result.body.data.borrowDate).toBe('2024-09-13T00:00:00.000Z');
        expect(result.body.data.returnDate).toBe('2024-09-22T00:00:00.000Z');
        expect(result.body.data.fine).toBe(2000);
        expect(result.body.data.returned).toBe(true);
    });

    it('should reject if borrowing date cannot be later than return date', async () => {
        const testMember = await getTestMember();
        const testBook = await getTestBook();

        const result = await supertest(app)
            .patch(`/api/books/${testBook.code}/borrowings/${testMember.code}`)
            .send({
                returnDate: '2024-09-10T00:00:00.000Z',
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if member is not found', async () => {
        const testMember = await getTestMember();
        const testBook = await getTestBook();

        const result = await supertest(app)
            .patch(`/api/books/${testBook.code}BB/borrowings/${testMember.code}`)
            .send({
                returnDate: '2024-09-20T00:00:00.000Z',
            });

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if book is not found', async () => {
        const testMember = await getTestMember();
        const testBook = await getTestBook();

        const result = await supertest(app)
            .patch(`/api/books/${testBook.code}/borrowings/${testMember.code}MM`)
            .send({
                returnDate: '2024-09-20T00:00:00.000Z',
            });

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});
