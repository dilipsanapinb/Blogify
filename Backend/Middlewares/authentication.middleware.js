const jwt = require('jsonwebtoken');
require('dotenv').config()
const authenticate = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(404).send({ message: "Token not found, plaese login first" })
        }
        jwt.verify(token,process.env.secrete, function (err, decoded) {
          if (err) {
            res
              .status(404)
              .send({ message: "Please Login first", Error: err.message });
          } else {
            const userId = decoded?.userId;
            req.body.userId = userId;
            next();
          }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Something went wrong at authenticating the user","Error":error.message})
    }
}

module.exports = authenticate;