const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (!user) res.status(401).send();
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        res.status(401).send();
    } else {
        const token = jwt.sign(
            { email: user.email },
            process.env.JWTSECRET,
            { expiresIn: '24h' }
        );
        res.status(200).json({
            email: user.email,
            token: token
        });
    }
}

exports.signUp = async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
        res.status(400).send("All input are required.");
    }
    const user = await User.findOne({ email: email })
    if (user) res.status(400);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        email: email,
        password: hashedPassword
    });
    if (newUser) {
        res.status(200);
        res.send(newUser)
    } else {
        res.status(400);
    }
}