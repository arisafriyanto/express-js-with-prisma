import express from 'express';
import { router } from '../routes/api.js';
import { errorMiddleware } from '../middlewares/errorMiddleware.js';

export const app = express();

app.use(express.json());
app.use(router);
app.use(errorMiddleware);
