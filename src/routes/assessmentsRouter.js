//Importamos dependencias
import express from 'express';

//Importamos el controller

import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { getAllAssessmentsController } from '../controllers/assesments/getAllAssessmentsController.js';
import { checkRole } from '../middlewares/checkRole.js';
import { votesController } from '../controllers/assesments/votesController.js';

export const assessmentsRouter = express.Router();

// Ruta para realizar valoración
assessmentsRouter.post(
    '/assessments',
    authUserMiddleware,
    votesController
)

//Ruta para listar valoraciones
assessmentsRouter.get(
    '/assessments',
    authUserMiddleware,
    checkRole('admin'),
    getAllAssessmentsController
);
