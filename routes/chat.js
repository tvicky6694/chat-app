const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatcontroller");
const middleware = require("../middlewares/auth");

/* GET routes for Users */
router.get("/", middleware.verifyToken, (req, res) => {
    res.render('chat');
});

router.post("/saveMessage", middleware.verifyToken,chatController.create);

module.exports = router;
