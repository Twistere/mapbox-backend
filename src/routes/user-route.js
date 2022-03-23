
const router = require("express").Router();

const userController = require("../controllers/user-controller");

router.get('/', (req, res) => {
    userController.displayUser(req, res)
});

module.exports = router;