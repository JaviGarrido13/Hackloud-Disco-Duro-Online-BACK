//Importamos dependencias
import express from 'express';

// Importamos los controllers
import { loginUserController } from '../controllers/users/loginUserController.js';
import { registerUserController } from '../controllers/users/registerUserController.js';
import { activateUsersController } from '../controllers/users/activateUserController.js';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { checkRole } from '../middlewares/checkRole.js';
import { getAllUsersController } from '../controllers/users/getAllUsersController.js';

export const usersRouter = express.Router();

// Ruta para el registro de usuarios
usersRouter.post('/users/register', registerUserController);

// Ruta para activar usuario
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
