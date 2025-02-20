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
        throw generateErrorUtils();
    }

    // Envia el mail de confirmación
    const emailSubject = 'Recuperación de contraseña en Hackloud';
    const emailText = `<h2>¡Recupera la contraseña para este email: ${email}</h2> <br> <p>Ha solicitado la recuperación de la contraseña de Hackloud.</p> <br> <p>Haga click en el siguiente código de recuperación para crear una nueva contraseña. </p> <br> <p>Código de recuperación: <strong>${recoveryPassCode}</strong></p>`;

    // Llama a la función que envia el email
    await sendMailBrevoUtils(email, emailSubject, emailText);

    // Devuelve el recoveryPassCode
    return recoveryPassCode;
};
