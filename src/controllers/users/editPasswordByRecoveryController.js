import validateSchemaUtil from '../../utils/validateSchemaUtil.js';
import recoveryPassSchema from '../../schemas/users/recoveryPassSchema.js';

// Importamos el Service
import { editPasswordByRecoveryService } from '../../services/users/editPasswordByRecoveryService.js';

export const editPasswordByRecoveryController = async (req, res, next) => {
    try {
        // Recupera el recoveryPassCode y la nueva contraseña
        const { recoveryPassCode, newPassword } = req.body;

        // Validamos con joi
        await validateSchemaUtil(recoveryPassSchema, req.body);

        // Llamar al service para editar la contraseña
        await editPasswordByRecoveryService(recoveryPassCode, newPassword);

        res.status(200).send({
            status: 'ok',
            message: 'La contraseña se ha actualizado correctamente',
        });
    } catch (error) {
        next(error);
    }
};
