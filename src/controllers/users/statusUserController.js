// Importamos el service
import { updateUserStatuService } from '../../services/users/updateUserStatuService.js';

// Importamos el errores
import generateErrorUtils from '../../utils/helpersUtils.js';

// Función controladora que se encarga de activar/desactivar usuarios
export const statusUserController = async (req, res, next) => {
    try {
        // Obtener el id del usuario a modificar
        const { id } = req.params;
        const { active } = req.body;

        // Validar que se recibe active
        if (active === undefined || active === '') {
            throw generateErrorUtils(
                '400',
                'INVALID_REQUEST',
                'El campo "active" es requerido'
            );
        }

        // Llamar al service para actualizar el estado del usuario
        const updatedUser = await updateUserStatuService(id, active);

        res.status(200).send({
            status: 'ok',
            message: `Usuario ${
                active ? 'activado' : 'desactivado'
            } correctamente`,
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};
