

import Card from '../Card/Card';
import style from './CardsContainer.module.css';


const CardsContainer = ({ pokemons, currentPage }) => {
  const startIndex = (currentPage - 1) * 12;
  const endIndex = currentPage * 12;

  const slicedPokemons = pokemons.slice(startIndex, endIndex);

  return (
    <div className={style.container}>
      {slicedPokemons.length > 0 ? (
        slicedPokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            id={pokemon.id}
            types={pokemon.types} 
          />
        ))
      ) : (
        <h2>No se encontraron Pokémon que cumplan con los criterios filtrados.</h2>
      )}
    </div>
  );
};


export default CardsContainer;