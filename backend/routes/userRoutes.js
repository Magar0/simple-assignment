const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const users = require('../models/userSchema');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//sign up ...................................
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    //validating....
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All field required" });
    }

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await users.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1hr' })
        res.status(200).json({ name, token })
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" })
    }
}
)

//log in....................
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    //validating....
    if (!email || !password) {
        return res.status(400).json({ message: "All field required" });
    }

    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User doesn't exist" });
        }

        const isPasswordCrt = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCrt) {
            return res.status(400).json({ message: "Password Wrong" })
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1hr' })
        res.status(200).json({ name: existingUser.name, token })
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" })
    }
}
)


//decrypting....
router.post('/decrypt', authMiddleware, async (req, res) => {
    const email = req.email
    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: `${email} doesn't exist` });
        }
        return res.status(400).json({ message: `${email} user exist` });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" })
    }
})


module.exports = router;