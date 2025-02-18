import { getPool } from '../../db/getpool.js';

export const searchFilesModel = async (userId, filters) => {
    const { name, folderId, minSize, maxSize, orderBy, orderDirection } =
        filters;

    const pool = await getPool();

    let query = `
        SELECT id, name, 'file' AS type, size, uploadedAt AS date, folderId
        FROM files 
        WHERE userId = ?
    `;

    let queryParams = [userId];

    // Agregar filtros opcionales para archivos
    if (name) {
        query += ' AND name LIKE ?';
        queryParams.push(`%${name}%`);
    }
    if (folderId) {
        query += ' AND folderId = ?';
        queryParams.push(folderId);
    }
    if (minSize) {
        query += ' AND size >= ?';
        queryParams.push(minSize);
    }
    if (maxSize) {
        query += ' AND size <= ?';
        queryParams.push(maxSize);
    }

    query += `
        UNION
        SELECT id, name, 'folder' AS type, NULL AS size, createdAt AS date, NULL AS folderId
        FROM folders
        WHERE userId = ?
    `;

    queryParams.push(userId);

    // Agregar filtros opcionales para carpetas
    if (name) {
        query += ' AND name LIKE ?';
        queryParams.push(`%${name}%`);
    }
    if (folderId) {
        query += ' AND id = ?';
        queryParams.push(folderId);
    }

    // Ordenación dinámica
    const validOrderBy = ['name', 'size', 'date'];
    if (orderBy && validOrderBy.includes(orderBy)) {
        query += ` ORDER BY ${orderBy} ${
            orderDirection === 'DESC' ? 'DESC' : 'ASC'
        }`;
    }

    const [items] = await pool.query(query, queryParams);
    return items;
};
