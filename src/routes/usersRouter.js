//Importamos dependencias
import express from 'express';

// Importamos los controllers
import { loginUserController } from '../controllers/users/loginUserController.js';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { activateUsersController } from '../controllers/users/activateUserController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { checkRole } from '../middlewares/checkRole.js';
import { getAllUsersController } from '../controllers/users/getAllUsersController.js';

import { editPasswordUserController } from '../controllers/users/editPasswordUserController.js';
import { getOwnUserController } from '../controllers/users/getOwnUserController.js';

export const usersRouter = express.Router();

// Ruta para login de usuarios
usersRouter.post('/users/login', loginUserController);

// Ruta para el registro de usuarios
usersRouter.post('/users/register', registerUserController);

// Ruta para activar usuarios
usersRouter.put('/users/activate/:registrationCode', activateUsersController);

// Ruta para login
usersRouter.post('/users/login', loginUserController);

// Ruta admin listar usuarios
usersRouter.get(
    '/users/list',
    authUserMiddleware,
    checkRole('admin'),
    getAllUsersController
);

// Ruta para cambiar contraseña de usuarios
usersRouter.put(
    '/users/password',
    authUserMiddleware,
    editPasswordUserController
);

// Ruta para obtener la info de usuario
usersRouter.get('/users/own', authUserMiddleware, getOwnUserController);
