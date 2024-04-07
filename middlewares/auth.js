const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  try {
    let token = req.session.token;
    if (typeof token !== "undefined") {
      jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
        if (err) {
          res.status(401).send({ msg: "Unauthorized" });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).send({ msg: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  verifyToken: verifyToken,
};
