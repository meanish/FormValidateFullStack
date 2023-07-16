const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "blog", // Specify the database name
})
    .then(() => {
        console.log("connected to the db")
    })
    .catch(() => {
        console.log("error in connecting with dataBase");
    })