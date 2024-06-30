const express = require('express');
const { createMulter ,multerError } = require('./upload'); // Import the createMulter function
const path = require('path');

const app = express();

// Example usage
const destination = 'uploads/'; // Destination directory
const filename = 'file_'; // File name prefix
const fileSize = 1 * 1024 * 1024; // File size limit (1MB)
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif']; // Allowed file types
const allowedFiles = 'JPEG, PNG, GIF'; // Allowed file types (for error message)

const upload = createMulter(destination, filename, fileSize, allowedFileTypes, allowedFiles);

// Use the 'upload' middleware in your routes
app.post('/upload', upload.single('file'), (req, res) => {
    // Handle the file upload
    res.send('File uploaded successfully');
});

// Error handling middleware
// app.use(multerError);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
