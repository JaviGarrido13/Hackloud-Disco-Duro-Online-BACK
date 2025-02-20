//Importamos dependencias
import express from 'express';

// Importamos Middlewares y Utils
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { checkRole } from '../middlewares/checkRole.js';
import { processFileUpload, upload } from '../utils/multerConfigUtils.js';

// Importamos los controllers
import { registerUserController } from '../controllers/users/registerUserController.js';
import { activateUsersController } from '../controllers/users/activateUserController.js';
import { loginUserController } from '../controllers/users/loginUserController.js';
import { editUserController } from '../controllers/users/editUserController.js';
import { editPasswordUserController } from '../controllers/users/editPasswordUserController.js';
import { sendRecoveryPassController } from '../controllers/users/sendRecoveryPassController.js';
import { editPasswordByRecoveryController } from '../controllers/users/editPasswordByRecoveryController.js';
import { editAvatarUserController } from '../controllers/users/editAvatarUserController.js';
import { deleteAvatarUserController } from '../controllers/users/deleteAvatarUserController.js';
import { getOwnUserController } from '../controllers/users/getOwnUserController.js';
import { getAllUsersController } from '../controllers/users/getAllUsersController.js';
import { statusUserController } from '../controllers/users/statusUserController.js';
import { deleteUserController } from '../controllers/users/deleteUserController.js';

export const usersRouter = express.Router();

// Ruta para el registro de usuarios
usersRouter.post('/users/register', registerUserController);

// Ruta para activar usuarios
usersRouter.put('/users/activate/:registrationCode', activateUsersController);

// Ruta para login de usuarios
usersRouter.post('/users/login', loginUserController);

// Ruta para editar y actualizar la info de usuario
usersRouter.put('/users/own', authUserMiddleware, editUserController);

// Ruta para cambiar contraseña de usuarios
usersRouter.put(
    '/users/password',
    authUserMiddleware,
    editPasswordUserController
);

// Ruta para recuperar la contraseña de un usuario
usersRouter.post('/users/password/recover', sendRecoveryPassController);

// Ruta para cambiar la contraseña de un usuario recuperada
usersRouter.put('/users/password/recover', editPasswordByRecoveryController);

// Ruta para actualizar el avatar de un usuario
usersRouter.put(
    '/users/avatar',
    authUserMiddleware,
    upload.single('avatar'),
    processFileUpload,
    editAvatarUserController
);

// Ruta para eliminar el avatar de un usuario
usersRouter.delete(
    '/users/avatar',
    authUserMiddleware,
    deleteAvatarUserController
);

// Ruta para obtener la info de usuario
usersRouter.get('/users/own', authUserMiddleware, getOwnUserController);

// Ruta admin listar usuarios
usersRouter.get(
    '/users/list',
    authUserMiddleware,
    checkRole('admin'),
    getAllUsersController
);

// Ruta admin habilitar/deshabilitar usuarios
usersRouter.put(
    '/users/status/:id',
    authUserMiddleware,
    checkRole('admin'),
    statusUserController
);

//Ruta para eliminar usuarios
usersRouter.delete(
    '/admin/user/:id',
    authUserMiddleware,
    checkRole('admin'),
    deleteUserController
);
