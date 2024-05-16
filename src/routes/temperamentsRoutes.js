const { Router } = require("express");

const { getTemperamentsHandler } = require("../handlers/temperamentsHandler");
const routerTemperaments = Router();

routerTemperaments.get("/", getTemperamentsHandler);

module.exports = routerTemperaments;
