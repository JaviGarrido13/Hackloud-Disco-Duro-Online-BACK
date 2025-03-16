// Importamos el Model
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const getOwnUserController = async (req, res, next) => {
    try {
        // Obtener los datos del usuario desde req.user
        const { id } = req.user;

        //Buscar el usuario en la BBDD
        const user = await selectUserByIdModel(id);

        // Eliminamos información sensible
        if (user) {
            delete user.password;
            delete user.active;
            delete user.registrationCode;
            delete user.recoveryPassCode;
        } else {
            throw generateErrorUtils(
                404,
                'USER_NOT_FOUND',
                'El usuario no existe'
            );
        }

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
