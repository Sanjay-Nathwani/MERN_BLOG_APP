import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// routes import
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log("Error Connecting MongoDB!",error));

const app = express();

// it is responsible for parsing incoming request with JSON payloads
// When a client sends a POST request with a JSON payload to your Express server, this middleware intercepts the request, parses the JSON data, and makes it available in req.body for further processing in your route handlers.
app.use(express.json());

app.listen(7000,() => {
    console.log('Server is running on port 7000');
});


// user routes
app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);

app.use((err,req,res,next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success : false,
    statusCode,
    message
  });
})