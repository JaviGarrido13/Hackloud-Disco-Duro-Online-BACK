import multer from 'multer';
import path from 'multer';
import { createPathUtil, createUserPath } from './foldersUtils.js';

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            const userId = req.user.id;
            const folderName = req.body.folderName || NULL;
            await createUserPath(userId);
            let uploadsDir;
            if (folderName) {
                uploadsDir = await createPathUtil(userId, folderName);
            } else {
                uploadsDir = path.join(`${process.cwd()}/uploads/${userId}`);
            }

            cb(null, uploadsDir);
        } catch (error) {
            cb(error, null);
        }
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    }
});

export const upload = multer({storage});