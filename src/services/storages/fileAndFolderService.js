//Importamos las dependencias
import fs from 'fs';
import generateErrorUtils from '../../utils/helpersUtils.js';

//Importamos el errors

//Services que se encarga de listar los archivos y carpetas.
export const listFilesAndFoldersService = async () => {
    const uploadDirectory = './uploads';

    //Verificamos si la carpeta existe
    if (!fs.existsSync(uploadDirectory)) {
        throw generateErrorUtils(
            404,
            'DIRECTORY_NOT_FOUND',
            'La carpeta de almacenamiento no existe'
        );
    }
    // Intentamos leer el directorio
    let items;
    try {
        // Leemos el contenido
        items = fs.readdirSync(uploadDirectory, { withFileTypes: true });
    } catch (error) {
        //Si ocurre algún error al intentar leer directorio mandamos un error
        throw generateErrorUtils(
            500,
            'DIRECTORY_READ_FAILED',
            'No se pudo leer el contenido de la carpeta'
        );
    }
    //Formatemos los items, nombre y tipo.
    return items.map((item) => ({
        name: item.name,
        type: item.isDirectory() ? 'folder' : 'file',
    }));
};
