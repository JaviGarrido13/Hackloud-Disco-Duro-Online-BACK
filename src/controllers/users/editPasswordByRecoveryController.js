import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import recoveryPassSchema from '../../schemas/users/recoveryPassSchema.js';

// Importamos el Service
import { editPasswordByRecoveryService } from '../../services/users/editPasswordByRecoveryService.js';

export const editPasswordByRecoveryController = async (req, res, next) => {
    try {
        // Recupera el email, el recoveryPassCode, la nueva contraseña y la confirmación de la nueva contraseña del body
        const { recoveryPassCode, newPassword } = req.body;

        await validateSchemaUtil(recoveryPassSchema, req.body);

        // Busca el usuario por email
        const user = await editPasswordByRecoveryService(
            recoveryPassCode,
            newPassword
        );
        console.log(user);

        res.status(200).send({
            status: 'ok',
            message: 'La contraseña se ha actualizado correctamente',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};
