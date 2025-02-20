// Importamos los Service
import { getUserByEmailService } from '../../services/users/getUserByEmailService.js';
import { editRecoveryPassCodeService } from '../../services/users/editRecoveryPassCodeService.js';

export const sendRecoveryPassController = async (req, res, next) => {
    try {
        // Recupera el email del body
        const { email } = req.body;

        // Busca el usuario por email
        const user = await getUserByEmailService(email);

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
