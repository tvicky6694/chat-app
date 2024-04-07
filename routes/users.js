const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");
const middleware = require("../middlewares/auth");

/* GET routes for Users */
router.get("/getOnlineUsers", middleware.verifyToken, authController.getOnlineUsers);
router.post("/login", authController.login);
router.post("/register", authController.register);
module.exports = router;
