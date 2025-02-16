import { ownUserService } from '../../services/users/ownUserService.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const getOwnUserController = async (req, res, next) => {
    try {
        // Obtener los datos del usuario desde req.user
        const { id } = req.user;

        //Buscar el usuario en la BBDD
        const user = await ownUserService(id);

        //Devolver el usuario
        res.status(200).json({
            status: 'ok',
            message: 'Usuario encontrado',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};
