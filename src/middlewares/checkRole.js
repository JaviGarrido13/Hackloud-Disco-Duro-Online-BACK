import generateErrorUtils from '../utils/helpersUtils.js';

export const checkRole = (requiredRole) => {
    return (req, res, next) => {
        try {
            // Asegurarse de que el usuario está autenticado
            if (!req.user) {
                throw generateErrorUtils(
                    401,
                    'AUTH_REQUIRED',
                    'No autorizado. Inicia sesión.'
                );
            }

            // Verificar si el usuario tiene el rol requerido
            if (req.user.role !== requiredRole) {
                throw generateErrorUtils(
                    403,
                    'INSUFFICIENT_PERMISSIONS',
                    'Acceso denegado. Permisos insuficientes.'
                );
            }

            next(); // Si el rol es correcto, continuar con la siguiente función
        } catch (error) {
            res.status(error.httpStatus || 500).send({
                error: error.code,
                message: error.message,
            });
        }
    };
};
