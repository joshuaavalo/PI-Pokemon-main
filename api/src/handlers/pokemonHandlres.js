const { getAllPokemons, getPokemonByName, getTypes } = require("../controllers/pokemonControllers");
const  createPokemon  = require ("../controllers/postController");


const getPokemonHandler = async (req, res) => {
    
    const {name} = req.query
    console.log(name);
    try {
        if (name) { // Si hay un parámetro de consulta "name"
            //const name = req.query.name;
            const poke = await getPokemonByName(name);
           
            res.status(200).json(poke);
        } else { // Si no hay un parámetro de consulta "name", obtiene todos los pokemones.
            const response = await getAllPokemons();
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getDetailHandler = async(req, res) => {
    try{
      const allPokemons = await getAllPokemons();
      const { idPokemon } = req.params;
      if(idPokemon){
        const pokemonId = allPokemons.filter(p => p.id == idPokemon);
        pokemonId.length ?
        res.json(pokemonId):
        res.status(404).send('No existe un Pokemon con ese ID')
      } 
    } catch (error) {
          throw new Error(error);
        }
  }

const getTypeHandler = async (req, res) => {
    try {
        const types = await getTypes();
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const postPokemonHandler = async (req, res) => {
    const { name, image, life, attack, defense, speed, height, weight, types, created } = req.body;
    console.log("soy el body :  ", req.body)

  try {
    const newPokemon = await createPokemon(name.toLowerCase(), image, life, attack, defense, speed, height, weight, types, created);

    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }

};

module.exports = {
    getPokemonHandler,
    getDetailHandler,
    getTypeHandler,
    postPokemonHandler
   
}