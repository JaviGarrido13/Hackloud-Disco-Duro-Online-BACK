//Importamos el error
import { getAllAssessmentsModel } from '../../models/assesments/getAllAssessmentsModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const getAllAssessmentsController = async (req, res, next) => {
    try {
        // Llamamos al model que nos devuelve todos los assessments
        const result = await getAllAssessmentsModel();
        //Si no hay valoraciones, lanzamos un error
        if (result.length === 0) {
            generateErrorUtils(
                404,
                'ASSESSMENTS_NOT_AVAILABLE',
                'Valoraciones no diponibles'
            );
        }
        res.status(200).send({
            status: 'ok',
            message: 'Valoraciones obtenidas correctamente',
            count: result.length,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
