//Importamos la conexión a la base de datos
import { getPool } from '../../db/getpool.js';

//Importamos el error
import generateErrorUtils from '../../utils/helpersUtils.js';

export const getAllAssessmentsController = async (req, res) => {
    try {
        const pool = await getPool();
        //Realizamos una consulta a la base de datos para obtener las valoraciones y ordenamos
        const [rows] = await pool.query(
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
        req.json(rows);
    } catch (error) {
        next(error);
    }
};
