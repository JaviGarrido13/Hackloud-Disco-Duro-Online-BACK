import { assessmentsMediaModel } from '../../models/assesments/assessmentsMediaModel.js';

export const assessmentsMediaController = async (req, res, next) => {
    try {
        // Llamar al model
        const result = await assessmentsMediaModel();
        if (result === 0) {
            res.status(404).json({ message: 'No hay valoración media' });
        }
        res.status(200).send({
            status: 'ok',
            message: 'Valoración media',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
