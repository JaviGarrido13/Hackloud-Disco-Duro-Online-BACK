// Importamos dependencias
import express from 'express';

// Importamos rutas
import { usersRouter } from './usersRouter.js';

export const router = express.Router();

// Definimos rutas
router.use(usersRouter);
