import crypto from 'crypto';

import { votesSchema } from '../../schemas/asessments/votesSchema.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

// LLamamos al model
import { insertVoteModel } from '../../models/assesments/insertVoteModel.js';

export const votesController = async (req, res, next) => {
    try {
        // Validar tipos de datos
        await votesSchema.validateAsync(req.body);

        // Obtener datos
        const { vote, comment } = req.body;
        const userId = req.user.id;

        // Validar datos
        if (!vote || !comment) {
            throw generateErrorUtils(
                400,
                'ASSEMENTS_FAILED',
                'Faltan datos para realizar la valoración'
            );
        }

        const voteId = crypto.randomUUID();
        // Insertar una valoracion
        const result = await insertVoteModel(voteId, userId, vote, comment);

        res.status(201).json({
            status: 'Ok',
            messages: 'Valoración realizada con éxito',
            data: {
                voto: vote,
                comentario: comment,
            },
        });
    } catch (error) {
        next(error);
    }
};
