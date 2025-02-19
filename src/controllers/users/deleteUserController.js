//Importamos el servicio
import { deleteUserService } from '../../services';

//Funcion controladora que se encarga de eliminar el usuario
export const deleteUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
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
