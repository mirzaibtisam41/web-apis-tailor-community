const SignupModel = require("../Models/Signup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtSecret } = require("../Config/keys");
var validator = require("email-validator");
const nodemailer = require('nodemailer');
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transport = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: "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"
        },
    })
)

const verifyToken = async (req, res) => {
    try {
        const findUser = await SignupModel.findOne({ email: req.body.email });
        if (findUser) {
            return res.json({ error: "Sorry, This email is already in use...!" });
        }
        else {
            const hashPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new SignupModel({
                userName: req.body.userName,
                shopName: req.body.shopName,
                email: req.body.email,
                phone: req.body.phone,
                password: hashPassword,
                isVerified: true
            });

            const token = jwt.sign({
                exp: 86400,
                data: newUser
            }, jwtSecret);

            await newUser.save();
            res.json({ user: newUser, token });
        }
    } catch (error) {
        console.log(error);
    }
}

const SignupController = () => {
    return {
        async Register(req, res) {

            if (!validator.validate(req.body.email)) {
                return res.json({ error: "Incorrect Email Address..." })
            }

            const token = jwt.sign({
                exp: 86400,
                data: newUser
            }, jwtSecret);

            transport.sendMail({
                to: req.body.email,
                from: "mirzaibtisam41@gmail.com",
                subject: "Tailors-Web-Community , Please click this link to verify your account",
                html: `<a href="http://localhost:3000/login?account=verified" onclick=${verifyToken(req, res)}>${token}</a>`
            })
        },

        async Login(req, res) {
            const { email, password } = req.body;
            try {
                const findLoginUser = await SignupModel.findOne({ email });
                if (!findLoginUser) {
                    return res.json({ "error": "Sorry, This email not exist...!" });
                }
                if (findLoginUser) {
                    if (findLoginUser.isVerified === false) return res.json({ msg: "Your accountis not verified..." });
                }
                else {
                    const verify = await bcrypt.compare(password, findLoginUser.password);
                    if (!verify) {
                        return res.json({ "error": "Password is not match...!" })
                    }
                    else {
                        const token = jwt.sign({
                            exp: 86400,
                            data: findLoginUser
                        }, jwtSecret);
                        res.json({ user: findLoginUser, token });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = SignupController;