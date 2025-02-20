// Importamos las dependencias
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import randomstring from 'randomstring';

// Importamos los models
import { selectUserByUsernameModel } from '../../models/users/selectUserByUsernameModel.js';
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
import { insertUserModel } from '../../models/users/insertUserModel.js';

// Importamos util
import sendMailBrevoUtils from '../../utils/sendMailUtils.js';

// Importamos el errores
import generateErrorUtils from '../../utils/helpersUtils.js';

// Service que se encarga de registrar al usuario
export const registerUserService = async (username, email, password) => {
    // Verificamos que el usuario no exista
    const user = await selectUserByUsernameModel(username);
    if (user) {
        throw generateErrorUtils(
            409,
            'USER_NAME_ALREADY_EXISTS',
            'El nombre de usuario ya existe'
        );
    }
    // Verificamos que el email no exista
    const userByEmail = await selectUserByEmailModel(email);
    if (userByEmail) {
        throw generateErrorUtils(
            409,
            'EMAIL_ALREADY_EXISTS',
            'El email ya existe'
        );
    }
    // Creamos id del usuario
    const id = crypto.randomUUID();
    // Hash del password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generamos codigo de registro
    const registrationCode = randomstring.generate(14);
    // Llamar al modelo que crea el usuario
    const result = await insertUserModel({
        id,
        username,
        email,
        password: hashedPassword,
        registrationCode,
    });
    if (result.affectedRows !== 1) {
        throw generateErrorUtils(
            409,
            'USER_NOT_CREATED',
            `El usuario no se creó correctamente : ${error.message}`
        );
    }
    // Enviamos el correo de registro
    const emailSubjet = 'Activa tu cuenta!';
    const emailText = `¡Bienvenid @${username} a Hackloud!
	\nGracias por registrarte en nuestra aplicación. Para activar tu cuenta, haz click en el siguiente enlace:
	\n<a href="http://localhost:3000/activate/${registrationCode}">Activa tu cuenta</a>
	`;
    await sendMailBrevoUtils(email, emailSubjet, emailText);

    return { id, username, email, registrationCode };
};
