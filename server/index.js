const fs = require('fs');
const cors = require('cors');
const express = require('express');
const multer = require('multer'); // Подключаем multer для обработки файлов
const path = require('path');
const { data } = require('./data');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get('/albums', (_, res) => {
	res.send(JSON.stringify(data.albumsPreview));
});

app.get('/album/:albumId/:step', (req, res) => {
	// send full album with his images datas
	const { albumId, step } = req.params;
	const images = [];
	const walk = 10;
	const startIndex = step * walk;
	const endIndex = startIndex + walk;

	for (let i = startIndex; i < endIndex; ++i) {
		const elem = data.albumFullData[albumId][i];
		if( !elem ) { break; }
		images.push(elem);
	}

	const result = {
		images,
		haveNext: true,
	}

	if (!data.albumFullData[albumId][endIndex]) {
		result.haveNext = false;
	}

	res.send(JSON.stringify(result));
});

app.get('/img/:image', (req, res) => {
	const fetchingImage = req.params.image;
  const imagePath = path.join(__dirname, 'images', `${fetchingImage}.png`);

  fs.readFile(imagePath, (err, img) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.setHeader('Content-Type', 'image/png');
      res.send(img);
    }
  });
});

let newImages = [];
const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, './uploads');
  },
  filename: (_, file, cb) => {
    const uniqueFileName = file.fieldname + '_' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    newImages.push(uniqueFileName);
    cb(null, uniqueFileName);
  }
});

const upload = multer({ storage });

app.post('/add', upload.array('images'), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files provided' });
  }
  
  // save new Images and create new album
  newImages = [];
  res.status(200).json({ message: 'Files uploaded successfully' });
});

app.listen(PORT, () => {
  console.clear();
  console.log('Server started at ' + PORT + ' PORT!');
});
