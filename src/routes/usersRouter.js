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
import { statusUserController } from '../controllers/users/statusUserController.js';
import { editUserController } from '../controllers/users/editUserController.js';
import { editPasswordByRecoveryController } from '../controllers/users/editPasswordByRecoveryController.js';
import { sendRecoveryPassController } from '../controllers/users/sendRecoveryPassController.js';
import { editAvatarUserController } from '../controllers/users/editAvatarUserController.js';
import { processAvatar, upload } from '../utils/multerConfigUtils.js';

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

// Ruta admin habilitar/deshabilitar usuarios
usersRouter.put(
    '/users/status/:id',
    authUserMiddleware,
    checkRole('admin'),
    statusUserController
);

// Ruta para editar y actualizar la info de usuario
usersRouter.put('/users/own', authUserMiddleware, editUserController);

// Ruta para recuperar la contraseña de un usuario
usersRouter.post('/users/password/recover', sendRecoveryPassController);

// Ruta para cambiar la contraseña de un usuario recuperada
usersRouter.put('/users/password/recover', editPasswordByRecoveryController);

// Ruta para actualizar el avatar de un usuario
usersRouter.put(
    '/users/avatar',
    authUserMiddleware,
    upload.single('avatar'),
    processAvatar,
    editAvatarUserController
);
