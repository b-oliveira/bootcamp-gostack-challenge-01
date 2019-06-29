const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

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

server.listen(3000);
