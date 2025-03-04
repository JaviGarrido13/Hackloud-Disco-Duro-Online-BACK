import randomstring from 'randomstring';

// Importamos los Utils
import generateErrorUtils from '../../utils/helpersUtils.js';
import sendMailBrevoUtils from '../../utils/sendMailUtils.js';

// Importamos el Model
import { updateRecoveryPassCodeModel } from '../../models/users/updateRecoveryPassCodeModel.js';

// Importamos el Service de RecoveryPass
export const editRecoveryPassCodeService = async (id, email) => {
    // Crea un código de recuperación
    const recoveryPassCode = randomstring.generate(15);

    // Actualizar el recoveryPassCode en el usuario
    const result = await updateRecoveryPassCodeModel(id, recoveryPassCode);
    if (result.affectedRows !== 1) {
        throw generateErrorUtils(
            500,
            'ERROR_SETING_RECOVERY_PASSCODE',
            'Error al actualizar el recovery code en la DDBB'
        );
    }

    //Definir la base del frontend
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    //Crear la URL
    const recoveryUrl = new URL('/users/recovery', frontendUrl);
    recoveryUrl.searchParams.append('recoveryPassCode', recoveryPassCode);

    //convertir la URL a string
    const recoveryLink = recoveryUrl.toString();

    // Envia el mail de confirmación
    const emailSubject = 'Recuperación de contraseña en Hackloud';
    const emailText = `
    <h2>Recuperación de contraseña</h2>
    <p>Has solicitado restablecer tu contraseña</p>
    <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p> 
    <a href= "${recoveryLink}"style='color: blue; font-weight: bold;'>Restablecer Contraseña</a>
    <p>Si el enlace no funciona, copia y pega esta URL en tu navegador:</p>
    <p>${recoveryLink}</p>`;

    // Llama a la función que envia el email
    await sendMailBrevoUtils(email, emailSubject, emailText);

    // Devuelve el recoveryPassCode
    return recoveryPassCode;
};
