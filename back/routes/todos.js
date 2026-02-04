// routes/todo.js
const express = require("express");
const router = express.Router();

// In-memory storage (replace with DB later)
let todos = [];
let nextId = 1;

// Helpers
function findTodo(id) {
  return todos.find((t) => t.id === id);
}

// GET /api/todos?filter=all|active|completed
router.get("/", (req, res) => {
  const filter = (req.query.filter || "all").toLowerCase();

  let data = todos;
  if (filter === "active") data = todos.filter((t) => !t.completed);
  if (filter === "completed") data = todos.filter((t) => t.completed);

  res.json({ ok: true, data });
});

// GET /api/todos/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: "Invalid id" });

  const todo = findTodo(id);
  if (!todo) return res.status(404).json({ ok: false, error: "Todo not found" });

  res.json({ ok: true, data: todo });
});

// POST /api/todos
// body: { text: string }
router.post("/", (req, res) => {
  const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
  if (!text) return res.status(400).json({ ok: false, error: "text is required" });

  const todo = {
    id: nextId++,
    text,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  todos.unshift(todo);
  res.status(201).json({ ok: true, data: todo });
});

// PUT /api/todos/:id
// body: { text?: string, completed?: boolean }
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: "Invalid id" });

  const todo = findTodo(id);
  if (!todo) return res.status(404).json({ ok: false, error: "Todo not found" });

  if (req.body?.text !== undefined) {
    const text = typeof req.body.text === "string" ? req.body.text.trim() : "";
    if (!text) return res.status(400).json({ ok: false, error: "text must be a non-empty string" });
    todo.text = text;
  }

  if (req.body?.completed !== undefined) {
    if (typeof req.body.completed !== "boolean") {
      return res.status(400).json({ ok: false, error: "completed must be boolean" });
    }
    todo.completed = req.body.completed;
  }

  todo.updatedAt = new Date().toISOString();
  res.json({ ok: true, data: todo });
});

// PATCH /api/todos/:id/toggle
router.patch("/:id/toggle", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: "Invalid id" });

  const todo = findTodo(id);
  if (!todo) return res.status(404).json({ ok: false, error: "Todo not found" });

  todo.completed = !todo.completed;
  todo.updatedAt = new Date().toISOString();

  res.json({ ok: true, data: todo });
});

// DELETE /api/todos/:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: "Invalid id" });

  const before = todos.length;
  todos = todos.filter((t) => t.id !== id);

  if (todos.length === before) return res.status(404).json({ ok: false, error: "Todo not found" });

  res.json({ ok: true });
});

// DELETE /api/todos (clear completed)
router.delete("/", (req, res) => {
  const mode = (req.query.mode || "").toLowerCase();
  if (mode !== "completed") {
    return res.status(400).json({ ok: false, error: 'Use ?mode=completed to clear completed todos' });
  }

  todos = todos.filter((t) => !t.completed);
  res.json({ ok: true });
});

module.exports = router;
