

const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

const app = express();

app.use(express.json());

const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

// Basic security headers
app.use(helmet());

// CORS – adjust origin as needed (front-end URL)
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Parse JSON
app.use(express.json());

// Prevent NoSQL injection (e.g. { "$gt": "" } in queries)
app.use((req, res, next) => {
  if (req.body) {
    mongoSanitize.sanitize(req.body);
  }
  if (req.params) {
    mongoSanitize.sanitize(req.params);
  }
  // We intentionally DO NOT touch req.query here
  next();
});

// Prevent HTTP parameter pollution (?a=1&a=2)
app.use(hpp());

// Hide "X-Powered-By: Express"
app.disable('x-powered-by');
const { apiLimiter, authLimiter } = require('./middleware/rateLimit');

//Routes 
// Global limiter (optional, can be commented out if too strict)
app.use('/api', apiLimiter);

// Stricter limiter for auth endpoints
//app.use('/auth', authLimiter); // adjust path if your auth routes are mounted differently


app.use("/users",  require('./routes/userRoutes'));
app.use("/booking", require("./routes/bookingRoutes"));
app.use("/service", require('./routes/serviceRoutes'));
app.use("/review", require('./routes/reviewRoutes'));
app.use("/gallery",  require('./routes/galleryRoutes'));
app.use("/contact", require("./routes/contactRoutes"));

// 404 handler for unknown routes
app.use(notFound);

// Global error handler
app.use(errorHandler);



const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.json({ message: "Server is running! " });
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
