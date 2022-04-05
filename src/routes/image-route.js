const router = require("express").Router();
const imageController = require("../controllers/image-controller");
const path = require("path");
const multer = require('multer');

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

router.post('/', imageUpload.array("upload", 12) , (req, res) =>{
    imageController.postImage(req, res)
    res.redirect('/')
});

router.get('/:filename', (req, res) => {

    imageController.displayImage(req, res)
    
});


module.exports = router;
