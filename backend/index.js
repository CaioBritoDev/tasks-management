const express = require("express");
const { config } = require("dotenv");
const cors = require("cors");

const app = express();
config();

// Middlewares

app.use(cors({
  origin: 'https://caiobritodev.github.io', // Replace with your client's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle pre-flight requests
app.options('*', cors());

app.use(express.json());

// Routes
app.use('/tasks', require("./routes/taskRoute"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));
