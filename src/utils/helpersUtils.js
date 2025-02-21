const generateErrorUtils = (status, code, message) => {
    const error = new Error();
    error.httpStatus = typeof status === 'number' ? status : 500;
    error.code = typeof code === 'string' ? code : 'INTERNAL_SERVER_ERROR';
    error.message =
        typeof message === 'string' ? message : 'Ocurrió un error inesperado.';

    return error;
};

export default generateErrorUtils;
