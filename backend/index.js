const express = require("express");
const { config } = require("dotenv");
const cors = require("cors");

const app = express();
config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', require("./routes/taskRoute"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));
