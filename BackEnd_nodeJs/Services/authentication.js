require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json("you have no authorety");

    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
            if (!err) {
                console.log(response);
                res.locales = response;
                next();
            } else {
                return res.status(403).json(err);
            }
        })
    }

}
function checkRole(req, res, next) {
    console.log(res.locales.role);
    if (res.locales.role != "Admin") {
        return res.status(403).json("Dont have the right role");
    }
    next();
}
module.exports = { authenticateToken: authenticateToken, check_role: checkRole };