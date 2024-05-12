const { Pokemon, Type } = require("../db");

const createPokemon = async (name, image, life, attack, defense, speed, height, weight, types, created) => {
  try {
    if (!name || !image || !life || !attack || !defense) {
      throw new Error("Los campos obligatorios no pueden estar vacíos");
    }

    const typeNames = Array.isArray(types) ? types : [types]; // se asegura que sea un array, si no lo esta, lo mete dentro de un array.

    // Busca los tipos en la base de datos
    const typeRecords = await Type.findAll({ where: { name: typeNames } }); // hace la busqueda en db del type.

    
  const pokeFind = await Pokemon.findOne({
  where:{name:name}

  });
  if(pokeFind){throw new Error("this pokemon already exists")};

    const createdPokemon = await Pokemon.create({ 
      name:name,
      image:image,
      life:parseInt(life),// antes de entrar a la base de datos lo convierte en entero
      attack:parseInt(attack),
      defense:parseInt(defense),
      speed:parseInt(speed),
      height:parseInt(height),
      weight:parseInt(weight),
      created:created,
    });

    // Asocia los tipos al Pokémon creado
    await createdPokemon.addType(typeRecords);

    // Devuelve el Pokémon creado con sus tipos
    createdPokemon.types = typeRecords.map((type) => type.name);

    return createdPokemon;
  } catch (error) {
    throw  error;
  }
};

module.exports = createPokemon;



