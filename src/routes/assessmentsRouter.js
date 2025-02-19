//Importamos dependencias
import express from 'express';

import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { checkRole } from '../middlewares/checkRole.js';

//Importamos los controllers
import { votesController } from '../controllers/assesments/votesController.js';
import { getAllAssessmentsController } from '../controllers/assesments/getAllAssessmentsController.js';

export const assessmentsRouter = express.Router();

// Ruta para realizar valoración
assessmentsRouter.post('/assessments', authUserMiddleware, votesController);

//Ruta para listar valoraciones
assessmentsRouter.get(
    '/assessments',
    authUserMiddleware,
    checkRole('admin'),
    getAllAssessmentsController
);
