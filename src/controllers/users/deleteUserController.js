import generateErrorUtils from '../../utils/helpersUtils.js';

//Importamos el servicio
import { deleteUserService } from '../../services/users/deleteUserService.js';

//Funcion controladora que se encarga de eliminar el usuario
export const deleteUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw generateErrorUtils(
                404,
                'USER_NOT_FOUND',
                'Usuario no encontrado'
            );
        }
        const result = await deleteUserService(id);
        res.status(200).send({
            status: 'ok',
            message: 'Usuario eliminado correctamente',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
