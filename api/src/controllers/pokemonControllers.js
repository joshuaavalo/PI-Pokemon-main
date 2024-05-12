const { Pokemon, Type } = require ("../db");
const axios = require ('axios');
require('dotenv').config();
const{ API_URL } = process.env;
const { Op } = require("sequelize");
const { infoCleaner } = require("../helpers");
const { cleanPokemon }= require("../helpers/cleanPokemon");


const getApiPokemons = async () => {
    const apiUrl = await axios.get(`${API_URL}/pokemon?limit=50`);
    const results = apiUrl.data.results

    const pokemonInfo = []

    
    for(let i = 0 ; i < results.length ; i++){
      const pokes = await axios.get(results[i].url);
      const pokeInfo = pokes.data;

      pokemonInfo.push({
        id: pokeInfo.id,
        name: pokeInfo.name,
        types: pokeInfo.types.map((t) => t.type.name).join(', '), // el .join desace el arrai de types y lo ,uestra como una string.
        img: pokeInfo.sprites.other['official-artwork'].front_default,
        attack: pokeInfo.stats[1].base_stat,
        weight: pokeInfo.weight,
        height: pokeInfo.height
      });
    }
    
    return pokemonInfo;
}

const getDbPokemons = async () => {
	const data = (await Pokemon.findAll({ 
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })).map(pokemon => {
    const json = pokemon.toJSON();
    return{
      ...json,
      types: json.types.map( type => type.name).join(', ')
    }
  });
  
  return data
}

const getAllPokemons = async () => {
    const apiInfo = await getApiPokemons();
    const dbInfo = await getDbPokemons();
    const infoTotal = [...apiInfo, ...dbInfo]; 
    // console.log(infoTotal)

    return infoTotal;
};


const getDetailPokemon = async(req, res) => {
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

/*const getPokemonByName = async (name1) => {
    

  try {
    //Buscar pokemons por nombre en la base de datos
    let pokesFromDB = await Pokemon.findAll({
      where: { name:name1 
        //{
          //[Op.iLike]: `%${name1}%`,
        //}},
      },
      include: { model: Type, attributes: ['name'], through: { attributes: [] }, }, // Incluir los tipos asociados
    });  
   
     //console.log(pokesFromDB[0].dataValues);
     //const pokesDb = pokesFromDb.map((pokes) => {return (pokes.dataValues)});
     const pokesDb = cleanDataDb(pokesFromDB, false);
      
      const response = await axios.get(`${API_URL}/pokemon/${name1}`);
      const infoApi = response.data;
      //console.log(infoApi);
       const pokeApi = cleanDataApi(infoApi, true);
       const pepito = [pokeApi]
     //const pokesFiltered = pokeApi.filter(poke => poke.name.toLowerCase().includes(name.toLowerCase()));
     //const pokemons = [ ...pepito, ...pokesDb ];
    return pokesDb;
     //return pok;

    
  } catch (error) {
    throw new Error('Error al obtener los pokemones: ' + error.message);
  }

}; */


const getPokemonByName = async (name) => {
  try {
    // Primero, busca en la base de datos
    const pokemonDB = await Pokemon.findOne({
      where: { name },
      include: {
        attributes: ["name"], // Solo selecciona el atributo 'name' del tipo
        model: Type,
        through: {
          attributes: [],
        },
      },
    });

    if (pokemonDB) {
      console.log("Traído de la base de datos");
      // Mapea los nombres de los tipos a un array de strings
      const types = pokemonDB.types.map((type) => type.name);
      return {
        ...pokemonDB.toJSON(),
        types: types.join(', '), // Convierte el array de tipos a una cadena de texto separada por comas
      };
    }

    // Si no se encuentra en la base de datos, busca en la API
    const apiResponse = await axios.get(`${API_URL}/pokemon/${name}`);
    const pokemonData = apiResponse.data;

    if (pokemonData) {
      console.log("Traído de la API");
      const pokemonApi = cleanPokemon(pokemonData);
      return pokemonApi;
    }

    // Si no se encuentra en la API, lanza una excepción
    throw new Error(`El Pokémon '${name}' no se encontró en la base de datos ni en la API.`);
  } catch (error) {
    throw new Error(`Error al obtener el Pokémon '${name}': ${error.message}`);
  }
};


const getTypes = async () => {
  const typeDB = await Type.findAll();

  if (typeDB.length) {
    console.log("Los datos Type ya estaban cargados en la DB 👎");
    return typeDB;
  }
  const typeApi = (await axios.get("https://pokeapi.co/api/v2/type")).data.results.map(({ name }) => {
    return { name };
  });
  await Type.bulkCreate(typeApi);
  console.log("Se cargaron los datos Type desde la Api a la DB 👍");
  return await Type.findAll();
};




module.exports = {
    getAllPokemons,
    getDetailPokemon,
    getPokemonByName,
    getTypes,
}