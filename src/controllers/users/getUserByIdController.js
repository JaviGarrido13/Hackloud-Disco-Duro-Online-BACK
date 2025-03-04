import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js';
import generateErrorUtils from '../../utils/helpersUtils.js';

export const getUserByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await selectUserByIdModel(id);
        console.log(user);
        if (!user) {
            throw generateErrorUtils(404, 'USER_NOT_FOUND', '404 usuario');
        } else {
            delete user.firstName;
            delete user.lastName;
            delete user.birthday;
            delete user.email;
            delete user.role;
            delete user.password;
            delete user.active;
            delete user.registrationCode;
            delete user.recoveryPassCode;
            delete user.createdAt;
            delete user.updatedAt;
        }
        res.status(200).send({
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
