export const createPathUtil = async (dirPath) => {
    try {
        // Intenta acceder al directorio
        await fs.access(dirPath);
    } catch (error) {
        // Si no existe el directorio, entra en el error del catch y lo crea
        await fs.mkdir(dirPath, { recursive: true });
        console.log(`📂 Directorio ${dirPath} creado correctamente`);
    }
};
