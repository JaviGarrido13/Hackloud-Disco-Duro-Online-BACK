// Importamos el model
import { selectAllUsersModel } from '../../models/users/selectAllUsersModel.js';

// Función controlladora que se encarga de listar todos los usuarios
export const getAllUsersController = async (req, res, next) => {
    try {
        // LLmamaos al service
        const users = await selectAllUsersModel();

        res.status(200).send({
            status: 'Ok',
            message: 'Lista de usuarios',
            data: { users },
        });
    } catch (error) {
        next(error);
    }
};
