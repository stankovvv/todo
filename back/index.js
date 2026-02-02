import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import { todosRouter } from "./routes/todos";


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

app.use("/api/todos", todosRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});