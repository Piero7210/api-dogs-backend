const { Router } = require("express");
const {
  getDogsHandler,
  getDogsByIdHandler,
  createDogsHandler,
} = require("../handlers/dogsHandlers");

const routerDog = Router();

routerDog.get("/", getDogsHandler);
routerDog.get("/:idRaza", getDogsByIdHandler);
routerDog.post("/create", createDogsHandler);

module.exports = routerDog;
