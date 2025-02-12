// Importamos el service
import { registerUserService } from '../../services/users/registerUserService.js';

// Importamos el util validateSchema
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// Importamos el schema
import newUserSchema from '../../schemas/users/newUserSchema.js';

// Función controladora que se encarga de registrar un usuario
export const registerUserController = async (req, res, next) => {
    try {
        // Validamos datos de la solicitud
        await validateSchemaUtil(newUserSchema, req.body);

        // Recogemos datos de la solicitud
        const { username, email, password } = req.body;

        // Llamar al service que registre al user
        const user = await registerUserService(username, email, password);

        // Respondemos con el usuario creado
        res.status(201).send({
            status: 'ok',
            message: 'Usuario registrado pendiente de activación',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
