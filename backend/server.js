const express = require("express");
const cors = require("cors");
const db = require("./config/connection");

// initialize app
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// routes 
// user routes
app.use("/api/user",require("./routes/user"))
// admin routes 
app.use("/api/admin",require("./routes/admin"))

app.listen(port, () => {
  console.log(`Serever is start listening on port ${port}`);
});
