

const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

const app = express();
app.use(cors());
app.use(express.json());

//Routes 

app.use("/auth", require("./routes/authRoutes"));
app.use("/users",  require('./routes/userRoutes'));
app.use("/booking", require("./routes/bookingRoutes"));
app.use("/service", require('./routes/serviceRoutes'));
app.use("/review", require('./routes/reviewRoutes'));
app.use("/gallery",  require('./routes/galleryRoutes'));


const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.json({ message: "Server is running! " });
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
