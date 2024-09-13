import { prismaClient } from '../src/application/database.js';

export const createManyTestMembers = async () => {
    for (let index = 0; index < 2; index++) {
        await prismaClient.member.createMany({
            data: {
                code: `TEST-${index}`,
                name: `Test ${index}`,
                penalty: false,
            },
        });
    }
};

export const removeManyTestMembers = async () => {
    await prismaClient.member.deleteMany({
        where: {
            code: {
                startsWith: 'TEST',
            },
        },
    });
};

export const createTestMember = async () => {
    return prismaClient.member.create({
        data: {
            code: `TEST-M`,
            name: `test name`,
            penalty: false,
        },
    });
};

export const removeTestMember = async () => {
    await prismaClient.member.delete({
        where: {
            code: 'TEST-M',
        },
    });
};

export const getTestMember = async () => {
    return prismaClient.member.findUnique({
        where: {
            code: 'TEST-M',
        },
    });
};

export const createTestBook = async () => {
    return prismaClient.book.create({
        data: {
            code: 'TEST-B',
            title: 'test title',
            author: 'test',
            stock: 1,
        },
    });
};

export const removeTestBook = async () => {
    await prismaClient.book.delete({
        where: {
            code: 'TEST-B',
        },
    });
};

export const createTestBorrowBook = async () => {
    return prismaClient.borrowing.create({
        data: {
            memberCode: 'TEST-M',
            bookCode: 'TEST-B',
            borrowDate: '2024-09-13T00:00:00.000Z',
        },
    });
};

export const removeAllTestBorrowings = async () => {
    await prismaClient.borrowing.deleteMany({
        where: {
            memberCode: 'TEST-M',
            bookCode: 'TEST-B',
        },
    });
};

export const getTestBook = async () => {
    return prismaClient.book.findUnique({
        where: {
            code: 'TEST-B',
        },
    });
};
