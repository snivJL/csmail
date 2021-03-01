const express = require("express");
const config = require("config");
const connectDB = require("./config/db");
const app = express();
var cors = require("cors");
app.use(cors());
//connect to database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get("/api", (req, res) => res.send("Salut!"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/messages", require("./routes/messages"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
