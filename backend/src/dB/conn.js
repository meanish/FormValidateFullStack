const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("connected to the db")
    })
    .catch(() => {
        console.log("error");
    })