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
    const frontendUrl = process.env.FRONTEND_HOST || 'http://localhost:5173';

    //Crear la URL
    const recoveryUrl = new URL('/users/recovery', frontendUrl);
    recoveryUrl.searchParams.append('recoveryPassCode', recoveryPassCode);

    //convertir la URL a string
    const recoveryLink = recoveryUrl.toString();

    // Envia el mail de confirmación
    const emailSubject = 'Recuperación de contraseña en Hackloud';
    const emailText = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
      <h2 style="color: #009EB5; margin-top: 20px; font-size: 20px;">Recuperación de contraseña</h2>
      
      <p style="color: #333; font-size: 14px;">Has solicitado restablecer tu contraseña en Hackloud.</p>
      
      <p style="color: #333; font-size: 14px;">Haz clic en el siguiente enlace para crear una nueva contraseña:</p> 
      
      <p style="margin: 15px 0;">
        <a href="${recoveryLink}" style="color: #009EB5; font-weight: bold; text-decoration: underline; font-size: 14px;">
          Restablecer Contraseña
        </a>
      </p>
      
      <p style="color: #333; font-size: 14px;">Si el enlace no funciona, copia y pega esta URL en tu navegador:</p>
      
      <div style="background-color: #f0f0f0; padding: 10px; border-radius: 4px; margin: 10px auto; word-break: break-all; font-size: 13px; color: #333;">
        ${recoveryLink}
      </div>
      
      <p style="color: #333; font-size: 14px;">Este enlace expirará en 24 horas.</p>
      
      <p style="margin-top: 20px; font-size: 12px; color: #666;">
        © Hackloud. Este es un correo automático, por favor no respondas a este mensaje.
      </p>
    </div>`;
    // Llama a la función que envia el email
    await sendMailBrevoUtils(email, emailSubject, emailText);

    // Devuelve el recoveryPassCode
    return recoveryPassCode;
};
