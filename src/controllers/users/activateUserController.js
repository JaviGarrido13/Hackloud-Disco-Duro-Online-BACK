// Importamos el service
import { activateUserServices } from '../../services/users/activateUserService.js';

// Importamos el errores
import generateErrorUtils from '../../utils/helpersUtils.js';

// Función controladora que se encarga de activar el usuario
export const activateUsersController = async (req, res, next) => {
    try {
        // Recuperamos el registrationCode de los params
        const { registrationCode } = req.params;
        if (!registrationCode) {
            throw generateErrorUtils(
                400,
                'REGISTRATION_CODE_MISSING',
                'El codigo de registration es obligatorio'
            );
        }

        // Llamar al service que activa el usuario con el codigo de registro
        const user = await activateUserServices(registrationCode);

        // Enviar la respuesta
        res.status(200).send({
            status: 'ok',
            message: 'Usuario activado correctamente',
        });
    } catch (error) {
        next(error);
    }
};
