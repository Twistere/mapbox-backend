const  { PrismaClient } = require('@prisma/client')
const express  = require('express')
const app = express()
const {insertImg, insertDate} = require('./services/image-service')
const multer = require('multer')
const path = require('path')
const xmp = require('exifr')

const imageUpload = multer({
  storage: multer.diskStorage(
      {
          destination: function (req, file, cb) {
              cb(null, 'src/images/');
          },
          filename: function (req, file, cb) {
              cb(
                  null,
                  new Date().valueOf() + 
                  '_' +
                  file.originalname
              )
          }
      }
  ), 
})


app.use(express.json())

app.listen(3000, () =>
  console.log('REST API server ready at: http://127.0.0.1:3000'),
)


app.use('/api', imageUpload.single('upload'),  async (req, res) => {
  const filePath = req.file.path
  const date = req.body.date
  console.log(req.headers)
  await insertDate(date)
  await insertImg(filePath)
  res.json('/upload api')

})

app.get('/image/:filename', (req, res) => {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, 'src/images/' + filename);
    return res.sendFile(fullfilepath);
})

