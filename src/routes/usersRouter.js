import express from 'express';
import { loginUserController } from '../controllers/users/loginUserController.js';

export const usersRouter = express.Router();

usersRouter.post('/users/login', loginUserController);
