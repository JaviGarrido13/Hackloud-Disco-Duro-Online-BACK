// Importamos dependencias
import express from 'express';

// Importamos rutas
import { usersRouter } from './usersRouter.js';
import { filesRouter } from './fileRoutes.js';

export const router = express.Router();

// Definimos rutas
router.use(usersRouter);
router.use(filesRouter);
