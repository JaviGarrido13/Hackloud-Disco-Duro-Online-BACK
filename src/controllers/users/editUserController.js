import { editUserService } from '../../services/users/editUserService.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const editUserController = async (req, res, next) => {
    try {
        // Obtener el id del usuario desde req.user
        const { id } = req.user;

        // Obtenemos los datos enviados en el body
        const newUserData = req.body;
        // Verificar si se envio la info
        if (!newUserData) {
            throw generateErrorUtils(
                400,
                'INFO_MISSING',
                'No se enviaron datos para actualizar'
            );
        }

        if (!newUserData.username || !newUserData.email) {
            throw generateErrorUtils(
                400,
                'INFO_MISSING',
                'Faltan datos para actualizar'
            );
        }

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
