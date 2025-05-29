const express = require("express");
const cors = require("cors");
const db = require("./config/connection");
require("dotenv").config();

// initialize app
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

//Serving routes
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/quiz", require("./routes/quiz.routes"));
app.use("/api/question", require("./routes/question.routes"));
app.use("/api/answer", require("./routes/answer.routes"));
app.use("/api/attempt", require("./routes/attempt.routes"));
app.use("/api/stat", require("./routes/stat.routes"));

app.listen(port, () => {
  console.log(`Serever is start listening on port ${port}`);
});
