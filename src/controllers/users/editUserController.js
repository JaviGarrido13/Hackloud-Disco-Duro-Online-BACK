// Importamos el Service
import { editUserService } from '../../services/users/editUserService.js';
// Importamos el util
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
// Importamos el schema
import editUserInfoSchema from '../../schemas/users/editUserInfoSchema.js';

export const editUserController = async (req, res, next) => {
    try {
        // Obtener el id del usuario desde req.user
        const { id } = req.user;

        // Obtenemos los datos enviados en el body
        const newUserData = req.body;

        // Validar los datos que llegan
        await validateSchemaUtil(editUserInfoSchema, req.body);

        // Actualizar los datos llamando al service
        const updatedUser = await editUserService(id, newUserData);

        res.status(200).send({
            status: 'ok',
            message: 'Usuario actualizado con exito',
            data: { user: updatedUser },
        });
    } catch (error) {
        next(error);
    }
};
