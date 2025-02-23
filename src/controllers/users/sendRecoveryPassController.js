// Importamos los Service
import { editRecoveryPassCodeService } from '../../services/users/editRecoveryPassCodeService.js';
// Importamos el model
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
// Importamos el errors
import generateErrorUtils from '../../utils/helpersUtils.js';

export const sendRecoveryPassController = async (req, res, next) => {
    try {
        // Recupera el email del body
        const { email } = req.body;

        // Busca el usuario por email
        const user = await selectUserByEmailModel(email);
        if (!user) {
            throw generateErrorUtils(
                404,
                'USER_NOT_FOUND',
                'Usuario no encontrado.'
            );
        }

        // Guarda el recoveryPassCode en el usuario
        const recoveryPassCode = await editRecoveryPassCodeService(
            user.id,
            email
        );

        res.status(200).send({
            status: 'ok',
            message: 'El código de recuperación ha sido enviado a tu email',
            data: { recoveryPassCode },
        });
    } catch (error) {
        next(error);
    }
};
