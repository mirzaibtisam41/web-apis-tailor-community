const express = require("express");
const app = express();
const cors = require("cors");
const DB = require("./Config/db");

// connect database
DB();

// use cors
app.use(cors());

// use body-parser
app.use(express.json({ extented: false }));

// use routes
app.get("/", (req, res) => {
    res.send("Api Running");
})

app.use("/api/user", require("./Routes/SignupRoute"));

// server listening port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Running On Port ${PORT}`));