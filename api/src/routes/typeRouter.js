const { Router } = require("express");
const { getTypeHandler } = require("../handlers/pokemonHandlres");

const typeRouter = Router();

// Ruta para cargar información de tipos de pokemon.
// GET /types
typeRouter.get("/types", getTypeHandler);

module.exports = typeRouter;
