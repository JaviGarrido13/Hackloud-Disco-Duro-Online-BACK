import { deleteAssessmentsModel } from '../../models/assesments/deleteAssessmentsModel.js';
import { getAssessmentByIdModel } from '../../models/assesments/getAssessmentByIdModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const deleteAssessmentsController = async (req, res, next) => {
    try {
        // Obtenemos id del assessment a eliminar de los params
        const { id } = req.params;
        // Verificar si el assessment existe
        const assessment = await getAssessmentByIdModel(id);
        if (!assessment) {
            throw generateErrorUtils(
                404,
                'ASSESSMENTS_NOT_FOUND',
                'El assessment que intenta eliminar no existe'
            );
        }
        // Llamamos al model para eliminar el assessments
        const result = await deleteAssessmentsModel(id);
        if (!result) {
            throw generateErrorUtils(
                500,
                'ERROR_DELETE_ASSESSMENT',
                'Error al eliminar el assessment'
            );
        }
        res.status(200).send({
            status: 'ok',
            message: 'Assessment eliminado correctamente',
        });
    } catch (error) {
        next(error);
    }
};
