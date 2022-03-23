const { insertImg } = require('../services/image-service');
const { insertDate } = require('../services/user-service');
const { imageUplaod } = require('../middlewares/image-middleware')
const path = require("path");
const multer = require("multer");


const postImage = async (req, res, next) => {
    const filePath = req.files;
    const date = req.body.date;
    console.log(req)
    await insertDate(date);
    await imageUplaod(filePath, res);
    for (let i = 0; i < filePath.length; i++) await insertImg(filePath[i].path);
    res.status(200);
    
};


const displayImage = (req, res, next) => {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, "src/images/" + filename);
    return res.sendFile(fullfilepath);
};

module.exports = {
    postImage,
    displayImage
}