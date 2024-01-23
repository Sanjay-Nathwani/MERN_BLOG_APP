import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// routes import
import userRoutes from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log("Error Connecting MongoDB!",error));

const app = express();

app.listen(7000,() => {
    console.log('Server is running on port 7000');
});

// test api
app.get("/test",(req,res)=>{
    res.json({message : "API is working!"});
})

// user routes
app.use("/api/user",userRoutes);