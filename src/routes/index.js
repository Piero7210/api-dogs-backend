const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routesDog = require("./dogsRoutes")
const routesTemperaments = require("./temperamentsRoutes");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", routesDog);
router.use("/temperament", routesTemperaments);

module.exports = router;
