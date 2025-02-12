// Importamos el model
import { getAllUsersModel } from '../../models/users/getAllUsersModel.js';

// Función controlladora que se encarga de listar todos los usuarios
export const getAllUsersController = async (req, res, next) => {
    try {
        // LLmamaos al service
        const users = await getAllUsersModel();

        res.status(200).send({
            status: 'Ok',
            message: 'Lista de usuarios',
            data: { users },
        });
    } catch (error) {
        next(error);
    }
};
