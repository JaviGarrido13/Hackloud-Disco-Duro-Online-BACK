//Importamos la conexión a la base de datos
import { pool } from '../../db';
//Importamos el error
import generateErrorUtils from '../../utils/helpersUtils.js';

export const getAllAssessmentsController = async (req, res) => {
    try {
        //Reañizamos una consulta a la base de datos para obtener las valoraciones y ordenamos
        const [row] = await pool.query(
            'SELECT * FROM assessments ORDER BY createdAt DESC'
        );
        //Si no hay valoraciones, lanzamos un error
        if (rows.length === 0) {
            return next(
                generateErrorUtils(
                    404,
                    'ASSESSMENTS_NOT_AVAILABLE',
                    'Valoraciones no diponibles'
                )
            );
        }
        req.json(row);
    } catch (error) {
        next(error);
    }
};
