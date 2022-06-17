const jwt = require("jsonwebtoken");
const connction = require('../connectionDb')
const cryptPass = require("bcrypt");


function generateCryptedPass(plainPass) {
    const hash = cryptPass.hashSync(plainPass, 5);
    return hash;
}
function verifPass(plainPass, hashedPass) {
    return cryptPass.compareSync(plainPass, hashedPass);
}

const userSignUp = (req, res) => {
    let newUser = req.body;
    //test existance of user
    var cquery = "select * from users where userEmail=?";
    connction.query(cquery, [newUser.userEmail], (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                //hashing password 
                const cryptedpass = generateCryptedPass(newUser.userPassword);

                //creation of new user
                var query =
                    "insert into users(userName,userLastName,userEmail,userPassword,userPhone,userBirthDate) values(?,?,?,?,?,?)";
                connction.query(
                    query,
                    [
                        newUser.userFirstName,
                        newUser.userLastName,
                        newUser.userEmail,
                        cryptedpass,
                        newUser.userPhone,
                        newUser.userBirthDate // need to be yyyy-mm-dd
                    ],
                    (err1, queryresult) => {
                        if (!err1) {
                            return res.status(200).json("user is saved in data base");
                        } else {
                            console.log("err in insert");
                            return res.status(500).json(err1);
                        }
                    }
                );
            } else {
                return res.status(400).json("user already exist !");

            }
        } else {
            return res.status(500).json(err);
        }
    });


}

const userLogin = (req, res) => {
    const logedUser = req.body;
    let query = "select u.userEmail,u.userPassword from users u where u.userEmail=?";

    connction.query(query, [logedUser.email], (err, resultQuery) => {
        if (!err) {
            const resPass = verifPass(logedUser.password, resultQuery[0].userPassword);
            if (resultQuery.length <= 0 || !resPass) {
                return res.status(401).json("check your credentinals");
            } else if (resPass) {
                const response = { email: resultQuery[0].userEmail };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                res.status(200).json({ token: accessToken });
            } else {
                return res.status(500).json(err);
            }
        } else {
            return res.status(500).json(err);
        }
    });

}

const userInfo = (req, res) => {
    console.log("userInfo controller is called");
    console.log(req);


}



module.exports = {
    userSignUp, userLogin, userInfo
}