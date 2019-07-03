var { create, login } = require('../models/user');
const jwt = require('jsonwebtoken');

class userController {

    async login(req, res) {
        let body = req.body;
        login(body.email, body.password, (err, success, user) => {
            if (success) {
                let jwtSignData = {
                    id: user.id,
                    email: user.email,
                };
                let jwtSignOptions = {
                    expiresIn: process.env.JWT_EXPIRATION_MINUTES,
                    algorithm: process.env.JWT_ALGORITHM
                };
                let token = jwt.sign(jwtSignData, process.env.JWT_SECRET, jwtSignOptions);
                res.status(200).json(token);
            } else {
                res.status(401).json({ status: false, error: 'Invalid Credentials' });
            }
        });

    }

    signup(req, res) {
        let body = req.body;
        create(body, (err, id) => {
            if (err) {
                res.status(302).json({ status: false, err: err })
            } else {
                res.status(200).json({ status: true })
            }
        })

    }

}

module.exports = userController;