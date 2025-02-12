import express from 'express';
import { usersRouter } from './usersRouter.js';

export const router = express.Router();

router.use(usersRouter);
