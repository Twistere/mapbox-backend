const {insertImg} = require('../services/image-service')

const postImage = async (req, res, next) => {   
    const filePath = req.file.path
    await insertImg(filePath)
    res.json('/upload api')
    next()
}

module.exports = {
    postImage
}