// Importamos las dependencias.
import brevo from '@getbrevo/brevo';

// Importamos los errores.
import generateErrorUtils from './helpersUtils.js';

// Obtenemos las variables de entorno necesarias.
import { SMTP_USER, SMTP_API_KEY } from '../../env.js';

// Creamos una instancia para poder enviar emails con @getbrevo.
const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, SMTP_API_KEY);

// Función que envía un mail a un usuario.
const sendMailUtils = async (to, subject, text) => {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.to = [{ email: to }];
        sendSmtpEmail.htmlContent = text;
        sendSmtpEmail.sender = { name: 'Equipo Hackloud', email: SMTP_USER };
        await apiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (err) {
        throw generateErrorUtils(
            500,
            'SEND_EMAIL_ERROR',
            'Error sending email'
        );
    }
};

export default sendMailUtils;
