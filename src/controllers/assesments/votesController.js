// Importamos dependencias
import crypto from 'crypto';

// LLamamos al model
import { insertVoteModel } from '../../models/assesments/insertVoteModel.js';

// Importamos utils y schema
import generateErrorUtils from '../../utils/helpersUtils.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import { votesSchema } from '../../schemas/asessments/votesSchema.js';

export const votesController = async (req, res, next) => {
    try {
        // Validar tipos de datos
        await validateSchemaUtil(votesSchema, req.body);

        // Obtener datos
        const { vote, comment } = req.body;
        const userId = req.user.id;

        const voteId = crypto.randomUUID();
        // Insertar una valoracion
        const result = await insertVoteModel(voteId, userId, vote, comment);
        if (!result) {
            throw generateErrorUtils(
                500,
                'ERROR_INSERT_ASSESSTMENT',
                'No se pudo publicar la valoración'
            );
        }

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
