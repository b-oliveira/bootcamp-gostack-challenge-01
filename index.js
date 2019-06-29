const express = require("express");

const server = express();

server.use(express.json());

let requests = 0;
const projects = [];

/**
 * Middleware global que imprime o número de requisições
 */
server.use((req, res, next) => {
  console.log(`Requisições: ${++requests}`);

  return next();
});

/**
 * Middleware para checar se um projeto existe
 */
function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const project = findProject(id);

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
 * Consulta um projeto
 */
server.get("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const project = findProject(id);

  return res.json(project);
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

  const project = findProject(id);

  project.title = title;

  return res.json(project);
});

/**
 * Exclui um projeto
 */
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const project = findProject(id);

  projects.splice(project.index, 1);

  return res.send();
});

/**
 * Cria uma tarefa para um projeto
 */
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = findProject(id);

  project.tasks.push(title);

  return res.json(project);
});

/**
 * Retorna um projeto
 */
function findProject(id) {
  return projects.find(p => p.id === id);
}

server.listen(3000);
