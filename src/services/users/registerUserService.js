// Importamos las dependencias
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import randomstring from 'randomstring';

// Importamos util
import sendMailBrevoUtils from '../../utils/sendMailUtils.js';
import { calculateAge } from '../../utils/calculateAge.js';

// Importamos el errores
import generateErrorUtils from '../../utils/helpersUtils.js';

// Importamos los models
import { selectUserByUsernameModel } from '../../models/users/selectUserByUsernameModel.js';
import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js';
import { insertUserModel } from '../../models/users/insertUserModel.js';
import { FRONTEND_HOST } from '../../../env.js';

// Service que se encarga de registrar al usuario
export const registerUserService = async (
    firstName,
    lastName,
    birthday,
    username,
    email,
    password
) => {
    // Verificamos que el username no exista
    const user = await selectUserByUsernameModel(username);
    if (user) {
        throw generateErrorUtils(
            409,
            'USERNAME_ALREADY_EXISTS',
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
    // Verificamos que sea mayor de edad
    if (birthday) {
        const edad = calculateAge(birthday);
        if (edad < 18) {
            throw generateErrorUtils(
                403,
                'UNDERAGE',
                'Debes ser mayor de 18 para registrarte'
            );
        }
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
        firstName,
        lastName,
        birthday,
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
    const emailSubject = 'Activa tu cuenta en Hackloud!';
    const emailText = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
      <h2 style="color: #009EB5; margin-top: 20px; font-size: 20px;">¡Bienvenid@ ${username} a Hackloud!</h2>
      
      <p style="color: #333; font-size: 14px;">Gracias por registrarte en nuestra aplicación. Para comenzar a utilizar todos nuestros servicios, necesitas activar tu cuenta.</p>
      
      <p style="color: #333; font-size: 14px;">Haz clic en el siguiente enlace para activar tu cuenta:</p> 
      
      <p style="margin: 15px 0;">
        <a href="${FRONTEND_HOST}/users/validation/${registrationCode}" style="color: #009EB5; font-weight: bold; text-decoration: underline; font-size: 14px;">
          Activar mi cuenta
        </a>
      </p>
      
      <p style="color: #333; font-size: 14px;">Si el enlace no funciona, copia y pega esta URL en tu navegador:</p>
      
      <div style="background-color: #f0f0f0; padding: 10px; border-radius: 4px; margin: 10px auto; word-break: break-all; font-size: 13px; color: #333;">
        ${FRONTEND_HOST}/users/validation/${registrationCode}
      </div>
      
      <p style="margin-top: 20px; font-size: 12px; color: #666;">
        © Hackloud. Este es un correo automático, por favor no respondas a este mensaje.
      </p>
    </div>`;

    await sendMailBrevoUtils(email, emailSubject, emailText);

    return { id, username, email, registrationCode };
};
