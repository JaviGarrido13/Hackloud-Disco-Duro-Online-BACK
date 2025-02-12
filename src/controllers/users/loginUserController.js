// Importamos Services
import loginUserSchema from '../../schemas/users/loginUserSchema.js';
import { loginUserService } from '../../services/users/loginUserService.js';

// Import el errors
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

// función controladora que se encarga de loggear un user
export const loginUserController = async (req, res, next) => {
    try {
        // Recuperamos datos del body
        const { email, password } = req.body;

        // Validamos los datos
        await validateSchemaUtil(loginUserSchema, req.body);

        // LLama al service de login que devuelve el token
        const token = await loginUserService(email, password);

        res.status(200).send({
            status: 'ok',
            message: 'Usuario logueado',
            data: { token },
        });
    } catch (error) {
        next(error);
    }
};
