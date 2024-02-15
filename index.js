const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const { PORT, REACT_BASE_URL } = require("./config/envConfig");
const db = require('./db/connection')
const adminRoute = require("./routes/adminRoutes")
const authRoute = require("./routes/authRoutes")
const masterRoute = require("./routes/masterRoutes")
const app = express();

app.use(cors({
    origin: [REACT_BASE_URL],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(adminRoute);
app.use(authRoute);
app.use(masterRoute)
app.use("/uploads", express.static("./uploads"))

app.get("/demo", (req, res) => {
    // res.json({ message: "helloooooo" });
    const sql = "SELECT * FROM books";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erorr inside server" });
        return res.json(result);
    })
});
app.get("/book", (req, res) => {
    try {
        const sql = "SELECT * FROM books";
        db.query(sql, (err, result) => {
            if (err) {
                console.error("Error in material query:", err);
                return res.status(500).json({ Message: "Internal Server Error" });
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ Message: "Internal Server Error" });
    }
});
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Message: 'We need a token, please provide it.' });
    } else {
        jwt.verify(token, 'our-jsonwebtoken-secret-key', (err, decoded) => {
            if (err) {
                res.clearCookie('token');
                return res.json({ Message: 'Authentication Error.', redirect: '/login' });
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
};

const sessionRoute = (req, res) => {
    res.header('Access-Control-Allow-Origin',);
    res.header('Access-Control-Allow-Credentials', true);
    res.json({ Status: 'Success', name: req.name });
};


app.get('/session', verifyUser, sessionRoute);

app.listen(PORT, () => {
    console.log(`Server running at Port ${PORT}`);
}) 