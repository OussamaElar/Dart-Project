const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const { error } = require("console");
const db = require("./config/keys").mongoURI;
const app = express();

mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => console.log("Connected to MongoDB successfully"))
      .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// const users = require("./routes/api/users");
// const lots = require("./routes/api/lots");
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// routes 
// app.use("/api/users", users);
// app.use("/api/tweets", lots);

// require("./config/passport")(passport); 
// test test