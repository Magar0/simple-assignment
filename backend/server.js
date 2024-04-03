const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv');

const dbConnect = require('./mongoose/dbConnect');
const userRoutes = require('./routes/userRoutes.js')
const decrypt = require('./routes/decryptRoutes.js')

dotEnv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get('/', (req, res) => {
    res.status(200).json({ message: "API is working" })
})

app.use('/user', userRoutes);
app.use('/decrypt', decrypt)

app.use('/', (err, req, res, next) => {
    res.status(500).json("Something Went Wrong")
})

dbConnect();
app.listen(PORT, () => {
    console.log("server is running on port:", PORT)
})


module.exports = app;