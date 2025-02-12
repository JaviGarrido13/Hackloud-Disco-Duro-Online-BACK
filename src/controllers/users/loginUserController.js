import { loginUserService } from '../../services/users/loginUserService.js';

export const loginUserController = async (req, res, next) => {
    try {
        // Recuperamos datos del body
        const { email, password } = req.body;
        // Lanzamos error si no tenemos email o contraseña
        if (!email || !password) {
            throw generateErrorUtils(
                400,
                'DATA_MISSING',
                'El email y la contraseña son obligatorios'
            );
        }

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
