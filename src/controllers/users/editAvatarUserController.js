import { editAvatarSchema } from '../../schemas/users/editAvatarSchema.js';
import { editAvatarService } from '../../services/users/editAvatarService.js';
import generateErrorUtils from '../../utils/helpersUtils.js';
import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

export const editAvatarUserController = async (req, res, next) => {
    try {
        // Obtener los datos del usuario desde req.user
        const { id } = req.user;

        console.log('Avatar recibido: ', req.file);

        const { avatar } = req.file;

        //Verificar si se ha subido un archivo
        if (!req.file) {
            throw generateErrorUtils(
                400,
                'NOT_AVATAR',
                'No se ha subido ninguna imagen'
            );
        }

        await validateSchemaUtil(editAvatarSchema, { avatar: req.file }); // req.file es el formato que se usa cuando se usa upload.single('avatar) en multer

        //llamar al service para guardar la imagen
        const userUpdated = await editAvatarService(id, req.file);

        res.status(201).send({
            status: 'ok',
            message: 'Avatar actualizado correctamente',
            data: { userUpdated },
        });
    } catch (error) {
        next(error);
    }
};
