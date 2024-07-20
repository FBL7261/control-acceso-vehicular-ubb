import multer from 'multer';

// Configuración del almacenamiento de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/upload/'); // Se define la carpeta de destino donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Configurar Multer con la configuración y el filtro de archivos
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 *1024 // Validación de que el archivo sea como máximo de 5 KB
    }
});