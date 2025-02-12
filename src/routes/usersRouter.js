//Importamos dependencias
import express from 'express';

// Importamos los controllers
import { loginUserController } from '../controllers/users/loginUserController.js';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { activateUsersController } from '../controllers/users/activateUserController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { editPasswordUserController } from '../controllers/users/editPasswordUserController.js';

export const usersRouter = express.Router();

// Ruta para login de usuarios
usersRouter.post('/users/login', loginUserController);

// Ruta para el registro de usuarios
usersRouter.post('/users/register', registerUserController);

// Ruta para activar usuarios
usersRouter.put('/users/activate/:registrationCode', activateUsersController);

//
usersRouter.put(
    '/users/password',
    authUserMiddleware,
    editPasswordUserController
);
