const multer = require('multer');
const path = require('path');

// Define the function
exports.createMulter = (destination, filename, fileSize, allowedFileTypes, allowedFiles, multerError) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination);
        },
        filename: (req, file, cb) => {
            cb(null, filename + Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: fileSize
        },
        fileFilter: (req, file, cb) => {
            if (allowedFileTypes.includes(file.mimetype)) {
                
                cb(null, true);
            } else {
                
                multerError(new Error(`Please upload only ${allowedFiles} file types.`), req, res, next);
            }
        }
    });

    return upload;
};


// Pass multerError as a parameter to createMulter function: