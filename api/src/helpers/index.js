const infoCleaner = (data) => {
    
    const pokeInfo = data
        return {
            id: pokeInfo.id,
            name: pokeInfo.name,
            types: pokeInfo.types.map((t) => t.type.name).join(`, `),
            img: pokeInfo.sprites.other['official-artwork'].front_default,
            attack: pokeInfo.stats[1].base_stat,
            weight: pokeInfo.weight,
            height: pokeInfo.height
        };
    };



module.exports = {
    infoCleaner,
}