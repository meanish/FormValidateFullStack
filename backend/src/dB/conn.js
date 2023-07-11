const mongoose = require("mongoose");

mongoose.connect(process.env.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("connected to the db")
    })
    .catch(() => {
        console.log("error in connecting with dB");
    })