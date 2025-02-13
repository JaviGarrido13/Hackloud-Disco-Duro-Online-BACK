//Importamos dependencias
import express from 'express';
import { createNewFolderModel } from '../models/folders/createNewFolderModel.js';


import express from "express";
import { createNewFolderModel } from "../models/folderModel.js"; // Asegúrate de la ruta correcta

export const storageRouter = express.Router();

// Ruta para crear una nueva carpeta
storageRouter.post("/folders", async (req, res) => {

    try {
        const { foldersId, foldersName, foldersUserId } = req.body;

        // Validación de datos
        if (!foldersId || !foldersName || !foldersUserId) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Llamar a la función del modelo para crear la carpeta
        const result = await createNewFolderModel(foldersId, foldersName, foldersUserId);

        res.status(201).json({
            message: `Carpeta '${foldersName}' creada exitosamente.`,
            folderId: foldersId,
            result
        });

    } catch (error) {
        console.error("Error en la creación de la carpeta:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});

//Importamos el controller

import { authUserMiddleware } from '../middlewares/authUserMiddleware';
import { listFilesAndFoldersControllers } from '../controllers/storages/fileAndFolderController';

// Ruta para crear una nueva carpeta
storageRouter.post("/folders")

//Ruta para listar archivos y carpetas
router.get('/storage/list', authUserMiddleware, listFilesAndFoldersControllers);
