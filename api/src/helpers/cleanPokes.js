

const cleanPokes = (data, isObejt) => {
   
    return isObejt? cleaner(data): data.map((poke)=>cleaner(poke))

};
const cleaner = (pokemon)=>{
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
      types:  pokemon.types.map((type) => {
        return {
          name: type.type.name,
        };
      }),
      created: false,
    };
  }
module.exports =  cleanPokes;
