const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

/**
 * Middleware para checar se um projeto existe
 */
function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id === id);

  if (!project) return res.status(404).json({ error: "Project not found!" });

  return next();
}

/**
 * Lista todos os projetos
 */
server.get("/projects", (req, res) => {
  return res.json(projects);
});

/**
 * Cria um projeto.
 */
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

/**
 * Edita um projeto.
 */
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(project);
});

server.listen(3000);
