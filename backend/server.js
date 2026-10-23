import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ticketRoutes from "./routes/tickets.js";

dotenv.config();

console.log("URI starts with:", process.env.MONGO_URI?.slice(0, 20));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("Help desk is running");
});

mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));