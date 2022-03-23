const res = require("express/lib/response");
const multer = require("multer");
const path = require("path");
const util = require("util");


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

}).array("upload", 12);

let imageUploadMiddleware = util.promisify(imageUpload);

module.exports = imageUploadMiddleware;