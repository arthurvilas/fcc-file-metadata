const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');
require('dotenv').config();


// MIDDLEWARE
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

// PATHS
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    res.json({
        name: req.file.filename,
        type: req.file.mimetype,
        size: req.file.size
    });

    // Remove uploaded file
    fs.readdir('uploads', (err, files) => {
        if (err) {
            console.log(err);
        };
        for (const file of files) {
          fs.unlink(path.join('uploads', file), err => {
            if (err) {
                console.log(err);
            }
          });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}...`);
});