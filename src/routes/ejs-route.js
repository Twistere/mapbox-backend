const router = require("express").Router();
const userController = require("../controllers/user-controller");

router.get('/', (req, res) =>{
    userController.displayUser(req, res);
});

router.get('/bundle', (req, res) =>{
    res.sendFile('C:/Users/Lucas/dev/mapbox/dist/bundle.js', )
})

router.get('/style', (req, res) =>{
    res.sendFile('C:/Users/Lucas/dev/mapbox/dist/style.css')
})

module.exports = router; 

