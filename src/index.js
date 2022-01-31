const  { PrismaClient } = require('@prisma/client')
const express  = require('express')
const multer = require('multer')
const path = require('path')
const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)

const imageUpload = multer({
    storage: multer.diskStorage(
        {
            destination: function (req, file, cb) {
                cb(null, 'images/');
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


app.post('/upload', imageUpload.single('upload'), async (req, res) => {
    const { filename, mimetype, size} = req.file
    const filePath = req.file.path

    await prisma.image.create({
        data : {
            pathImg: filePath
        }
    })
    console.log(req.file)
    res.json('/upload api')
})

app.get('/image/:filename', (req, res) => {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, 'images/' + filename);
    return res.sendFile(fullfilepath);
})

