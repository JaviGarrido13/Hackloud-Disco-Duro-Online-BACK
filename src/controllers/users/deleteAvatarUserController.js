// Importamos el Service
import { deleteAvatarUserService } from '../../services/users/deleteAvatarUserService.js';

export const deleteAvatarUserController = async (req, res, next) => {
    try {
        // Obtener id del usuario de la request
        const userId = req.user.id;

        // Llama al service para eliminar el avatar
        await deleteAvatarUserService(userId);

        // Devolver respuesta con los datos del usuario actualizado y el mensaje de éxito 201
        res.status(201).send({
            status: 'ok',
            message: 'Avatar eliminado con éxito',
        });
    } catch (error) {
        next(error);
    }
};
