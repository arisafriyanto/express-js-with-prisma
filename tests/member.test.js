import supertest from 'supertest';
import { createManyTestMembers, removeManyTestMembers } from './testUtils.js';
import { app } from '../src/application/app.js';

describe('GET /api/members', () => {
    beforeEach(async () => {
        await createManyTestMembers();
    });

    afterEach(async () => {
        await removeManyTestMembers();
    });

    it('should can get members', async () => {
        const result = await supertest(app).get('/api/members');

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.errors).toBeUndefined();
    });
});
