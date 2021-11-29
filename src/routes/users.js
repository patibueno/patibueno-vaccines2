const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.post("/", controller.createUser);
router.post("/login", controller.loginUser);
router.get("/", controller.getAllUsers);
router.delete("/:id", controller.deleteUser);

module.exports = router;
