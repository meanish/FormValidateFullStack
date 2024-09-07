require("dotenv").config();
const express = require("express");
const app = express();
require("./src/dB/conn");
const PORT = process.env.PORT || 8000;
const cors = require('cors');


const path = require("path");

const userRegisterRouter = require("./routes/userRegisterRouter");
const userLoginRouter = require("./routes/userLoginRouter");
const userLogoutRouter = require("./routes/userLogoutRouter");
const imageRouter = require("./routes/imageRouter");
const blogRouter = require("./routes/blogRouter");


app.use(cors());


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json()); //if we get json in return from file express handles in postman
app.use(express.urlencoded({ extended: false })); //not only postman in live server too return json handles
app.use(express.static(path.join(__dirname, "public")));

app.use("/register", userRegisterRouter);
app.use("/login", userLoginRouter);
app.use("/logout", userLogoutRouter);
app.use("/imgupload", imageRouter); // POST endpoint for image uploads

app.use("/blog", blogRouter);

// ..................DEPLOYEMENT......................
const _dirname1 = path.resolve();

console.log("path finder", _dirname1);

if (process.env.NODE_ENV === "deployment") {
  app.use(express.static(path.join(_dirname1, "..", "/frontend/build")));

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



const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`Prt Connected in  ${PORT}`);
});


