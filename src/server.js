// Importamos dependencias
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Importamos las rutas
import { router } from './routes/indexRouter.js';

// Importamos variable de entorno
import { UPLOADS_DIR } from '../env.js';
import generateErrorUtils from './utils/helpersUtils.js';

// Creamos el servidor
export const server = express();

/* MIDDLEWARES */
// Muestra por consola información de la petición
server.use(morgan('dev'));

// Permitir la conexión entre frontend y backend
server.use(cors());

// Parsear el body de la petición
server.use(express.json());

// Permitir la subida de archivos
server.use(express.urlencoded({ extended: true }));

// Directorio de ficheros estáticos.
server.use('/uploads', express.static(UPLOADS_DIR));

/*ROUTERS*/
server.use(router);

/*ERRORES*/
//Ruta no encontrada
server.use((req, res, next) => {
    next(
        generateErrorUtils(
            404,
            'ROUTE_NOT_FOUND',
            `No se encontró la ruta: ${req.originalUrl}`
        )
    );
});

//Gestor de errores
server.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500).send({
        httpStatus: error.httpStatus || 500,
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: error.message,
    });
});
