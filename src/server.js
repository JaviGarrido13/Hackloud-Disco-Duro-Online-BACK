// Importamos dependencias
import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';

// Importamos variable de entorno
import { UPLOADS_DIR } from '../env.js';

// Creamos el servidor
export const server = express();

/* MIDDLEWARES */
// Muestra por consola información de la petición
app.use(morgan('dev'));

// Permitir la conexión entre frontend y backend
app.use(cors());

// Parsear el body de la petición
app.use(express.json());

// Permitir la subida de archivos
app.use(fileUpload());

// Directorio de ficheros estáticos.
app.use('/uploads', express.static(UPLOADS_DIR));

/*ROUTERS*/
// server.use(router);

/*ERRORES*/
//Ruta no encontrada
app.use((req, res, next) => {
    const resorce = req.path;
    const error = new Error(`No se encontró el recurso ${resorce}`);
    error.status = 404;
    error.code = 'NOT_FOUND';
    next(error);
});

//Gestor de errores
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500).send({
        httpStatus: error.httpStatus || 500,
        status: 'ERROR!',
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: error.message,
    });
});
