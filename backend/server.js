const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

let whitelist = ['http://localhost:3000','http://localhost:5000', 'http://abc.com']

// Get those routers
const userRouter = require("./routes/users");
const exerciseRouter = require("./routes/exercises");

app.use(cors({
  origin:'*'
}))
app.use(express.json());

// Use those routers
app.use("/users", userRouter);
app.use("/exercises", exerciseRouter);

// app.use(function (req, res) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
// });

// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin 
//     if(!origin) return callback(null, true);
//     if(whitelist.indexOf(origin) === -1){
//       var message = 'The CORS policy for this origin doesn\'t ' +
//                 'allow access from the particular origin.';
//       return callback(new Error(message), false);
//     }
//     return callback(null, true);
//   }
// }));


// Connect with database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

app.listen(port, () => {
  console.log("Server is running on port :" + port);
});
