import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});

prismaClient.$on('query', (e) => {
    console.info(e);
});

prismaClient.$on('error', (e) => {
    console.error(e);
});

prismaClient.$on('info', (e) => {
    console.info(e);
});

prismaClient.$on('warn', (e) => {
    console.warn(e);
});
