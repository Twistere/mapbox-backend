
const router = require("express").Router();

const userController = require("../controllers/user-controller");

router.get("/", async (req, res) => {
    userController.displayUserJson(req, res)
});

module.exports = router;