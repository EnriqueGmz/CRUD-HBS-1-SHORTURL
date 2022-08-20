const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const registerForm = (req, res) => {
    res.render("register");
};

const registerUser = async (req, res) => {
    console.log(req.body);
    const { userName, email, password } = req.body;
    try {

        let user = await User.findOne({ email: email });
        if (user) throw new Error("Ya existe el usuario");

        user = new User({ userName, email, password, tokenConfirm: uuidv4(3) })
        await user.save();
        res.json(user);

    } catch (error) {
        res.json({ error: error.message });
    }
    res.json(req.body);
};

const loginForm = (req, res) => {
    res.render("login");

};

module.exports = {
    loginForm,
    registerForm,
    registerUser
};

