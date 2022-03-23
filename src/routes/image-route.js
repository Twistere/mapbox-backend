const router = require("express").Router();
const imageController = require("../controllers/image-controller");

router.post('/', imageController.postImage);

router.get('/:filename', (req, res ) =>{

    imageController.displayImage(req, res)
    
});

module.exports = router;
