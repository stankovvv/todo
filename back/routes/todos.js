import { Router } from "express";
const todosRoutes = Router();

todosRoutes.get("/", (req, res) => {
  res.json({ message: "todos route works" });
});

export default todosRoutes;
