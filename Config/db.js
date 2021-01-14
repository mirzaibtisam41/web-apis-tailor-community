const mongoose = require("mongoose");
const { mongoURI } = require("./keys");

const mongoConnect = () => {
    try {
        mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("MongoDB Connect");
    } catch (err) {
        console.log("Error while DB connection");
    }
}

module.exports = mongoConnect;