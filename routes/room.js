const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomcontroller");
const middleware = require("../middlewares/auth");

/* GET routes for Users */
router.get("/", middleware.verifyToken, (req, res) => {
    res.render('room');
});
router.post("/create", middleware.verifyToken,roomController.create);
module.exports = router;
