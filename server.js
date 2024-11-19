const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const upload = require('./src/storage');
const upload = require('./src/storage');
require('dotenv').config();

const app = express();
const port = process.env.PORT ;


app.use(helmet());
/*app.use(cors({
  origin: 'https://blabladomaine.com', 
  methods: ['GET'] 
}));*/

app.use('/images', express.static(path.join(__dirname, 'images')));

app.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({ 
      message: 'Image uploaded successfully', 
      filePath: `/images/${req.file.filename}` 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server launched`);
});
