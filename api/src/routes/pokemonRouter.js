const { Router } = require('express');
const { getPokemonHandler, getDetailHandler, postPokemonHandler } = require("../handlers/pokemonHandlres");



const pokemonRouter = Router();




pokemonRouter.get("/pokemons", getPokemonHandler);

pokemonRouter.get("/pokemons/:id", getDetailHandler );

pokemonRouter.post("/create", postPokemonHandler);
//pokemonRouter.get("/pokemons?name", getPokemonHandler);



module.exports = pokemonRouter;