import { Router } from "express";
const todosRouter = Router();

todosRouter.get("/", (req, res) => {
  res.json({ message: "todos route works" });
});

export default todosRouter;
