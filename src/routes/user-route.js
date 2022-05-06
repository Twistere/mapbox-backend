
const router = require("express").Router();

const userController = require("../controllers/user-controller");

router.get("/:id", async (req, res) => {
    userController.displayUserJson(req, res)
});

router.get("/date", async (req, res) => {
    userController.displayDateJson(req, res)
});

module.exports = router;