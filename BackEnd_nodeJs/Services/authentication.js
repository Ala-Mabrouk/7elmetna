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
function VerifValidToken(req) {
    const tempToken = req.body.user_web_token
    let resTest = false;
    if (tempToken != null) {

        jwt.verify(tempToken, process.env.ACCESS_TOKEN, (err, response) => {
            if (!err) {
                console.log("the result is" + response);
                resTest = true
                // return res.status(200).json("token is valid");

            }
        })
        return resTest
        //  return res.status(403).json(err); 
    }
    return resTest;

}
function checkRole(req, res, next) {
    console.log(res.locales.role);
    if (res.locales.role != "Admin") {
        return res.status(403).json("Dont have the right role");
    }
    next();
}
function getMailFromToken(req) {
    let userMail
    jwt.verify(req, process.env.ACCESS_TOKEN, (err, response) => {
        if (!err) {
            //     console.log(response);
            console.log(response.email);
            userMail = response.email + "";
        }
    });
    return userMail
}
module.exports = { authenticateToken: authenticateToken, check_role: checkRole, validateToken: VerifValidToken, getMailFromToken: getMailFromToken };