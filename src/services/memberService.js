import { prismaClient } from '../application/database.js';

const list = async () => {
    const result = await prismaClient.member.findMany({
        select: {
            code: true,
            name: true,
            penalty: true,
            borrowings: {
                where: {
                    returnDate: null,
                },
                select: {
                    bookCode: true,
                },
            },
        },
    });

    const membersWithBorrowCount = result.map((member) => ({
        code: member.code,
        name: member.name,
        penalty: member.penalty,
        borrowedBooks: member.borrowings.length,
    }));

    return membersWithBorrowCount;
};

export default { list };
