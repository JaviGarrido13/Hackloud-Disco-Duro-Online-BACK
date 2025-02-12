//Importamos dependencias
import express from 'express';

// Importamos los controllers
import { loginUserController } from '../controllers/users/loginUserController.js';
import { registerUserController } from '../controllers/users/registerUserController.js';

export const usersRouter = express.Router();

// Ruta para login
usersRouter.post('/users/login', loginUserController);

// Ruta para el registro de usuarios
usersRouter.post('/users/register', registerUserController);
