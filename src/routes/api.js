import express from 'express';
import memberController from '../controllers/memberController.js';
import bookController from '../controllers/bookController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Member
 *   description: Show all members
 */

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Retrieve a list of members
 *     description: Get a list of all members in the database.
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: A list of members with borrow books count
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     example: M001
 *                   name:
 *                     type: string
 *                     example: Angga
 *                   penalty:
 *                     type: boolean
 *                     example: false
 *                   borrowedBooks:
 *                     type: integer
 *                     example: 0
 */
router.get('/api/members', memberController.list);

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: Operations related to books
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of books
 *     description: Get a list of all books in the database.
 *     tags: [Book]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     example: SHR-1
 *                   title:
 *                     type: string
 *                     example: A Study in Scarlet
 *                   author:
 *                     type: string
 *                     example: Arthur Conan Doyle
 *                   stock:
 *                     type: integer
 *                     example: 1
 */
router.get('/api/books', bookController.list);

/**
 * @swagger
 * /api/books/{bookCode}/borrowings/{memberCode}:
 *   post:
 *     summary: Borrow a book
 *     description: |
 *      Borrow a book from the database. The book will be marked as borrowed by the specified member.
 *
 *      **Members in the database**
 *      - M001 Angga
 *      - M002 Ferry
 *      - M003 Putri
 *
 *      **Books in the database**
 *      | Book Code | Title                                 | Author                |
 *      | --------- | --------------------------------------| --------------------- |
 *      | JK-45     | Harry Potter                          | J.K Rowling           |
 *      | SHR-1     | A Study in Scarlet                    | Arthur Conan Doyle    |
 *      | TW-11     | Twilight                              | Stephenie Meyer       |
 *      | HOB-83    | The Hobbit, or There and Back Again   | J.R.R. Tolkien        |
 *      | NRN-7     | The Lion, the Witch and the Wardrobe  | C.S. Lewis            |
 *     tags: [Book]
 *     parameters:
 *       - name: bookCode
 *         in: path
 *         required: true
 *         description: The code of the book to be borrowed
 *         schema:
 *           type: string
 *           example: SHR-1
 *       - name: memberCode
 *         in: path
 *         required: true
 *         description: The code of the member borrowing the book
 *         schema:
 *           type: string
 *           example: M001
 *     requestBody:
 *       description: Borrowing details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               borrowDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-09-13
 *     responses:
 *       200:
 *         description: Successfully borrowed the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 memberCode:
 *                   type: string
 *                   example: M001
 *                 bookCode:
 *                   type: string
 *                   example: SHR-1
 *                 borrowDate:
 *                   type: string
 *                   format: date
 *                   example: 2024-09-13T00:00:00.000Z
 */
router.post('/api/books/:bookCode/borrowings/:memberCode', bookController.createBorrowBook);

/**
 * @swagger
 * /api/books/{bookCode}/borrowings/{memberCode}:
 *   patch:
 *     summary: Return a borrowed book
 *     description: |
 *      Return a book that was borrowed. The book's stock will be updated, and the borrowing record will be updated with the return details.
 *
 *      **Members in the database**
 *      - M001 Angga
 *      - M002 Ferry
 *      - M003 Putri
 *
 *      **Book in the database**
 *      | Book Code | Title                                 | Author                |
 *      | --------- | --------------------------------------| --------------------- |
 *      | JK-45     | Harry Potter                          | J.K Rowling           |
 *      | SHR-1     | A Study in Scarlet                    | Arthur Conan Doyle    |
 *      | TW-11     | Twilight                              | Stephenie Meyer       |
 *      | HOB-83    | The Hobbit, or There and Back Again   | J.R.R. Tolkien        |
 *      | NRN-7     | The Lion, the Witch and the Wardrobe  | C.S. Lewis            |
 *     tags: [Book]
 *     parameters:
 *       - name: bookCode
 *         in: path
 *         required: true
 *         description: The code of the book being returned
 *         schema:
 *           type: string
 *           example: SHR-1
 *       - name: memberCode
 *         in: path
 *         required: true
 *         description: The code of the member returning the book
 *         schema:
 *           type: string
 *           example: M001
 *     requestBody:
 *       description: Return details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-09-20
 *     responses:
 *       200:
 *         description: Successfully returned the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 memberCode:
 *                   type: string
 *                   example: M001
 *                 bookCode:
 *                   type: string
 *                   example: SHR-1
 *                 borrowDate:
 *                   type: string
 *                   format: date
 *                   example: 2024-09-13
 *                 returnDate:
 *                   type: string
 *                   format: date
 *                   example: 2024-09-20
 *                 fine:
 *                   type: integer
 *                   example: 0
 *                 returned:
 *                   type: boolean
 *                   example: true
 */
router.patch('/api/books/:bookCode/borrowings/:memberCode', bookController.updateBorrowBook);

export { router };
