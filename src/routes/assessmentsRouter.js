//Importamos dependencias
import express from 'express';

// Importamos Middlewares
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';
import { checkRole } from '../middlewares/checkRole.js';

//Importamos los controllers
import { votesController } from '../controllers/assesments/votesController.js';
import { getAllAssessmentsController } from '../controllers/assesments/getAllAssessmentsController.js';
import { assessmentsMediaController } from '../controllers/assesments/assessmentsMediaController.js';
import { deleteAssessmentsController } from '../controllers/assesments/deleteAssessmentsController.js';

export const assessmentsRouter = express.Router();

// Ruta para realizar valoración
assessmentsRouter.post('/assessments', authUserMiddleware, votesController);

//Ruta para listar valoraciones
assessmentsRouter.get('/assessments', getAllAssessmentsController);

// Ruta para obtener media valoraciones
assessmentsRouter.get('/assessments/average', assessmentsMediaController);

// Ruta para eliminar una valoración
assessmentsRouter.delete(
    '/assessments/:id',
    authUserMiddleware,
    checkRole('admin'),
    deleteAssessmentsController
);
