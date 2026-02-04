import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import MONGODB_URI from "dotenv"
import { todosRoutes } from "./routes/todos.js";

const app = express();
app.use(express.json());
dotenv.config();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MONGODB CONNECTION OKAY");
    app.listen(PORT, () => {
      console.log(`🚀 SERVER LISTENS PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB-yhteysvirhe", err.message);
    process.exit(1);
  });

  app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});
const todosRoutes = require(".todos.js");
app.use("/api/todos", todosRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});