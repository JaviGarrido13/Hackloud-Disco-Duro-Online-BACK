import recoveryPassSchema from '../../schemas/users/recoveryPassSchema.js';
import { editPasswordByRecoveryService } from '../../services/users/editPasswordByRecoveryService.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

export const editPasswordByRecoveryController = async (req, res, next) => {
    try {
        // Recupera el email, el recoveryPassCode, la nueva contraseña y la confirmación de la nueva contraseña del body
        const { email, recoveryPassCode, newPassword, newPasswordConfirm } =
            req.body;

        await validateSchemaUtil(recoveryPassSchema, req.body);

        // Busca el usuario por email
        const user = await editPasswordByRecoveryService(
            email,
            recoveryPassCode,
            newPassword,
            newPasswordConfirm
        );

        res.status(200).send({
            status: 'ok',
            message: 'La contraseña se ha actualizado correctamente',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};
