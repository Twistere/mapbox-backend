const express = require("express");
const app = express();
const { insertImg, insertDate } = require("./services/image-service");
const multer = require("multer");
const path = require("path");

const { fetchUser } = require("./services/user-service");
const res = require("express/lib/response");

app.set('views', '/home/Lucas/development/mapbox-frontend/dist');
app.set('view engine', 'html')
app.set('view engine', 'ejs');

const imageStorage = multer.diskStorage({
  // Destination de mes images
  destination: function (req, file, cb) {
    cb(null, "src/images/");
  },
  //Renommage des images avec la date du jour avec minute seconde lors de l'insertion 
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + "_" + file.originalname);
  },

});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    // Vériéfie les fichiers uploadés pour n'accepter que des images
    if (ext !== '.PNG' && ext !== '.JPG' && '.JEPG')
      cb(new Error('Seulement des images'));
    cb(null, true);
  },

})

app.use(express.json());

app.listen(3000, () =>
  console.log("REST API server ready at: http://127.0.0.1:3000")
);

app.use("/api", imageUpload.array("upload", 12), async (req, res) => {
  const filePath = req.files;
  const date = req.body.date;

  await insertDate(date);

  for (let i = 0; i < filePath.length; i++) await insertImg(filePath[i].path);

  res.json('Niquel')
});

app.get("/image/:filename", (req, res) => {
  const { filename } = req.params;
  const dirname = path.resolve();
  const fullfilepath = path.join(dirname, "src/images/" + filename);
  return res.sendFile(fullfilepath);
});

app.get("/user", async (req, res) => {
  let user = fetchUser();
  user.then(function (result) {
    console.log(result);
    res.render("index", { user: result });
  });
});


app.get("/", async (req, res) => {
  res.sendFile("/home/Lucas/development/mapbox-frontend/dist/index.html")
})

app.get("/style", async (req, res) => {
  res.sendFile("/home/Lucas/development/mapbox-frontend/dist/style.css")
})

app.get("/bundle", async (req, res) => {
  res.sendFile("/home/Lucas/development/mapbox-frontend/dist/bundle.js")
})

