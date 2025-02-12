//Importamos dependencias
import express from 'express';

// Importamos los controllers
import { loginUserController } from '../controllers/users/loginUserController.js';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { activateUsersController } from '../controllers/users/activateUserController.js';

export const usersRouter = express.Router();

// Ruta para login
usersRouter.post('/users/login', loginUserController);

// Ruta para el registro de usuarios
usersRouter.post('/users/register', registerUserController);

// Ruta para activar usuario
usersRouter.put('/users/activate/:registrationCode', activateUsersController);
