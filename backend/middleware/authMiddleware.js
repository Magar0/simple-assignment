const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err || !decoded.email) {
                return res.status(401).json({ error: "Unauthorized" })
            }
            req.email = decoded.email;
            next()
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" })
    }
}

module.exports = authMiddleware;