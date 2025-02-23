// Importamos el Service
import { editPasswordUserService } from '../../services/users/editPasswordUserService.js';
// Importamos el util
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
// Importamos el schema
import editPasswordSchema from '../../schemas/users/editPasswordSchema.js';

export const editPasswordUserController = async (req, res, next) => {
    try {
        //  Obtiene id del usuario desde req.user
        const { id } = req.user;

        // Obtiene la info del req.body, y validamos los datos
        const newPass = req.body;

        await validateSchemaUtil(editPasswordSchema, req.body);

        await editPasswordUserService(id, newPass);

        // Responde con el usuario actualizado
        res.status(200).send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (error) {
        next(error);
    }
};
