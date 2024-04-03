const express = require('express');
const users = require('../models/userSchema');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();

//decrypting....
router.get('/', authMiddleware, async (req, res) => {
    const email = req.email
    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: `${email} doesn't exist` });
        }
        return res.status(200).json({ message: `${email} user exist` });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" })
    }
})

module.exports = router;
