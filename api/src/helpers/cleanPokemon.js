// aqui van las funciones que usaré en los controllers o las funciones que son reutilizables
//! los que tengan el atributo created: false (son de la Api)
//! los que tengan el atributo created: true (son de la DB)
//const { Pokemon, Type } = require("../db");

const cleanPokemon = (pokemon) => {

    // Mapea los nombres de los tipos a un array
  const types = pokemon.types.map((type) => type.type.name);
    
  return {
    id: pokemon.id,
    name: pokemon.forms[0].name,
    image: pokemon.sprites.other["dream_world"].front_default || pokemon.sprites.other["home"].front_default || pokemon.sprites.other["official-artwork"].front_default,
    // image: pokemon.sprites.other["dream_world"].front_default, //649 pokemons svg
    // image: pokemon.sprites.other["home"].front_default, // 906 Pokemons
    // image: pokemon.sprites.other["official-artwork"].front_default, // 1017 pokemons
    life: pokemon.stats[0].base_stat,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    speed: pokemon.stats[5].base_stat,
    height: pokemon.height,
    weight: pokemon.weight,
    // Convierte el array de tipos a una cadena de texto separada por comas
    types:  pokemon.types.map((type) => type.type.name),
    created: false,
  };
};

module.exports = { cleanPokemon };
