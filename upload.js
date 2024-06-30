const multer = require('multer');
const path = require('path');

// Error handling middleware
const multerError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(400).send(err.message); // Sending a more appropriate status code and the error message
};

// Define the function
exports.createMulter = (destination, filename, fileSize, allowedFileTypes, allowedFiles) => {
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
        fileFilter: (req, res ,file, cb) => {
            if (allowedFileTypes.includes(file.mimetype)) {
                console.log("yessssssssssssss");
                cb(null, true);
            } else {
                console.log("nnnnnnnnnnnnnnnn");
                multerError(new Error(`Please upload only ${allowedFiles} file types.`), req, res, next);
            }
        }
    });

    return upload;
};
