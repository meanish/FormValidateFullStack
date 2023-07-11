require("dotenv").config();
const express = require("express");
const app = express();
require("./src/dB/conn");
const PORT = process.env.PORT || 8000;
const path = require("path");


const userRegisterRouter = require("./routes/userRegisterRouter");
const userLoginRouter = require("./routes/userLoginRouter");


app.use(express.json()); //if we get json in return from file express handles in postman
app.use(express.urlencoded({ extended: false }));  //not only postman in live server too return json handles



app.use("/register", userRegisterRouter);
app.use("/login", userLoginRouter);

// ..................DEPLOYEMENT......................
const _dirname1 = path.resolve();


console.log("path finder",_dirname1);


if (process.env.NODE_ENV === "deployment") {
    console.log("Am I in")
    app.use(
        express.static(path.join(_dirname1, "..", "/frontend/build"))
    );

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(_dirname1, "..", "frontend", "build", "index.html")
        );
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running sucessfully");
    });
}

// ..................DEPLOYEMENT......................






app.listen(PORT, "127.0.0.1", () => {
    console.log("Port Connected")
})