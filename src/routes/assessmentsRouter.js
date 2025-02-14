//Importamos dependencias
import express from 'express';

//Importamos el controller
import { getAllAssessmentsController } from '../controllers/';
import { authUserMiddleware } from '../middlewares/authUserMiddleware.js';

export const assessmentsRouter = express.Router();
//Ruta para listar valoraciones
assesmentsRouter.get(
    '/assesments',
    authUserMiddleware,
    getAllAssessmentsController
);
