const { uuid } = require("uuidv4");
const express = require("express");
const cors = require("cors");

// const { v4: uuid, validate: isUuid } = require('uuid');

const apiSource = express();

apiSource.use(express.json());
apiSource.use(cors());

const repositories = [];

apiSource.get("/repositories", (request, response) => {
 
  return response.json(repositories);
});

apiSource.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repository = {
    id : uuid(),
    title,
    url,
    techs,
    likes:0
  }
  repositories.push(repository);

  return response.json(repository);
});

apiSource.put("/repositories/:id", (request, response) => {
 
  const { id } = request.params;
  const {title, url, techs} = request.body;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);
  if(findRepositoryIndex == -1){
    return response.status(400).json({error:'Repositorio não encontrado'});
  }

  const repository = {
    id:repositories[findRepositoryIndex].id,
    title,
    url,
    techs,
    likes:repositories[findRepositoryIndex].likes
  };

  repositories[findRepositoryIndex] = repository;
  return response.json(repository);

});

apiSource.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id === id
  );

  if(findRepositoryIndex > 0){
    repositories.splice(findRepositoryIndex,1);
  }else{
    return response.status(400).json({Error:"Repositorio não encontrado"});
  }

  return response.status(204).send();
  
});

apiSource.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository =>
    repository.id === id
  );

  if(findRepositoryIndex === -1){
    return response.status(400).json({Error:"Repositorio não encontrado"});
  }

  repositories[findRepositoryIndex].likes++;

  return response.json(repositories[findRepositoryIndex]);

});

module.exports = apiSource;

