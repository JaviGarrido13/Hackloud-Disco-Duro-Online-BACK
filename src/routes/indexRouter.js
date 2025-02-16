// Importamos dependencias
import express from 'express';

// Importamos rutas
import { usersRouter } from './usersRouter.js';
import { storageRouter } from './storageRouter.js';
import { assessmentsRouter } from './assessmentsRouter.js';

export const router = express.Router();

// Definimos rutas
router.use(usersRouter);
router.use(storageRouter);
router.use(assessmentsRouter);
