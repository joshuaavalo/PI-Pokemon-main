/*import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearDetails, getDetails } from "../../Redux/actions";
import Loading from "../../components/Loading/Loading.Component";
import typesBackground from "../../utils/colors";
import style from "./Detail.module.css";


const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemonDetail = useSelector((state) => state.details);

  const getBackgroundColor = () => {
    if (pokemonDetail.types && pokemonDetail.types.length > 0) {
      const primaryType = pokemonDetail.types[0].name;
      const backgroundStyle = typesBackground[primaryType] || {};

      return backgroundStyle;
    }
    return {};
  };

  useEffect(() => {
    dispatch(getDetails(id));
    return () => {
      dispatch(clearDetails(id));
    };
  }, [dispatch, id]);

  return (
    <div className={style.container}>
      {pokemonDetail?.name ? (
        <div
          className={style.cardDetail}
          style={getBackgroundColor()}>
          <div className="cardAbout">
            {pokemonDetail.image && (
              <img
                src={pokemonDetail.image}
                alt={pokemonDetail.name}
                className="pokemon-img"
              />
            )}
            <div className={style.typeImage}>
              {pokemonDetail?.types.map((type, index) => (
                <span key={index}>
                  <img
                    src={`../../assets/img/labels/${type.name}.png`}
                    alt={pokemonDetail.types.name}
                    className="type-image type-label"
                  />

                  {index < pokemonDetail.types.length - 1 ? " " : ""}
                </span>
              ))}
            </div>
          </div>
          <div className={style.data}>
            <div className="title">
              <h3 className=""># {pokemonDetail.id}</h3>
              <h2>{pokemonDetail.name.toUpperCase()}</h2>
            </div>
            <div className={style.data}>
              <p>
                {pokemonDetail.life}
                <span>LIFE</span>
              </p>
              <p>
                {pokemonDetail.attack}
                <span>Attack</span>
              </p>
              <p>
                {pokemonDetail.defense}
                <span>Defense</span>
              </p>
              <p>
                {pokemonDetail.speed}
                <span>Speed</span>
              </p>
              <p>
                {pokemonDetail.height}
                <span>Height</span>
              </p>
              <p>
                {pokemonDetail.weight}
                <span>Weight</span>
              </p>
            </div>
          </div>

          <div>
            <Link
              className="button-back"
              to="/home">
              Back
            </Link>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Detail;
*/

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { clearDetails, getDetails } from "../../Redux/actions"; // Importa la acción para obtener los detalles del Pokémon
import style from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Obtiene el ID del Pokémon de los parámetros de la URL
  const navigate = useNavigate(); // Hook para volver
  const pokemonDetail = useSelector((state) => state.details); // Obtiene los detalles del Pokémon del estado global
  console.log(pokemonDetail.name);

  useEffect(() => {
    dispatch(getDetails(id)); // Dispara la acción para obtener los detalles del Pokémon
    return () => {
      dispatch(clearDetails()); // Limpia los detalles del Pokémon cuando el componente se desmonte
    };
  }, [dispatch, id]);

  const goback = () => {
    navigate(-1);
  };

  const tipo = pokemonDetail.types?.map(type => type.name).join(', ');

  return (
    <div className={style.detail}>
    {/* {pokemonDetail && ( */}
        <>
          <div>
            <img className={style.image} src={pokemonDetail.image} alt={pokemonDetail.name} />
          </div>
          <div className={style.text}>
            <h2>ID: {pokemonDetail.id}</h2>
            <h2>Nombre: {pokemonDetail.name}</h2>
            <p>Vida: {pokemonDetail.life}</p>
            <p>Ataque: {pokemonDetail.attack}</p>
            <p>Defensa: {pokemonDetail.defense}</p>
            <p>Velocidad: {pokemonDetail.speed}</p>
            <p>Altura: {pokemonDetail.height} dm</p>
            <p>Peso: {pokemonDetail.weight} hg</p>
            <p>Tipos: {tipo}</p>
            <button onClick={goback}>Volver</button>
          </div>
        </>
      {/* )} */}
    </div>
  );
};

export default Detail;



/*
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
    types: types.join(', '),
    created: false,
*/