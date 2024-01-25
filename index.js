const express = require("express");
const glob = require("glob");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

const BASE_URL = process.env.URL|| 'https://grantapi.cyclic.app';
const imageFolderPath = path.join(__dirname, 'images');
//ratelimit
app.use(cors());
app.set("json spaces", 2);



//middleware
app.use(cookieParser())
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

//base
const funRoutes = require("./src/router/index.js");
//routers
app.use("/fun", funRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    api_name: "grantapi",
    author: "calvgrant",
    description:
      "Grant Api adalah api yang berisikan tentang hal random dari sebuha gambar anime sebuah joke gajelas dan hal lainnya yang ga berguna.",
    version: "v1.0.0",
    end_points: {
      "/fun/jokereceh": "Mendapatkan semua data candaan berupa teks",
      "/fun/gombal": "Mendapatkan satu data candaan berupa teks secara random",
    },
    repository: "https://github.com/calvgrant/grantapi",
    email: "alvintungga17@gmail.com",
    social: {
      github: "https://github.com/calvgrant",
    },
  });
});

app.get('/grant', (req, res) => {
  return res.status(200).send({
    maintainer: 'Calvin Grant',
    source: 'https://github.com/calvgrant',
  });
});



app.get('/papkits', (req, res) => {
  // Read the contents of the image folder
  const imageFiles = fs.readdirSync(imageFolderPath);

  // Randomly select an image file
  const randomImageFile = imageFiles[Math.floor(Math.random() * imageFiles.length)];

  // Set content type for the response
  res.setHeader('Content-Type', 'image/jpeg'); // Adjust content type based on your image format

  // Send the selected image file as the response
  const imagePath = path.join(imageFolderPath, randomImageFile);
  const imageStream = fs.createReadStream(imagePath);
  imageStream.pipe(res);
});


//errorhandler


//loadfiles
app.listen(process.env.PORT || 3000, function () {
  console.log(`[Running on port: 3000]`);
});
