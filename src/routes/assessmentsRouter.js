//Importamos dependencias
import express from 'express';

//Importamos el controller

import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { getAllAssessmentsController } from '../controllers/assesments/getAllAssessmentsController.js';
import { checkRole } from '../middlewares/checkRole.js';

export const assessmentsRouter = express.Router();
//Ruta para listar valoraciones
assessmentsRouter.get(
    '/assesments',
    authUserMiddleware,
    checkRole('admin'),
    getAllAssessmentsController
);
