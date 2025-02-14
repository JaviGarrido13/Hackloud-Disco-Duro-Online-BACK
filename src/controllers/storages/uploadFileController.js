export const uploadFileController = async (req, res, next) => {
    try {
        // Verifica si los archivos están presentes en la solicitud
        if (!req.file) {
            throw generateErrorUtils(
                400,
                'NO_FILE_UPLOADED',
                'No has subido ningun archivo'
            );
        }
        const { originalname, filename, size } = req.file;
        const userId = req.user.id;
        const folderName = req.body || NULL;
        const savedFile = await uploadFilesService({
            userId,
            folderName,
            originalname,
            filename,
            size,
        });

        // Retorna la respuesta con los archivos guardados
        res.status(200).send({
            status: 'ok',
            message: `Archivos subidos correctamente a la carpeta`,
            data: savedFile,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
