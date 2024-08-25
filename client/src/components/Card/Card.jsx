//este componente debe mostrar la info de cada usuario mapeado, pero ademas, darnos un link para ir al detalle del usuario en cuestion

/*
import { Link } from "react-router-dom";
import typesBackground from "../../utils/colors";
import style from "./Card.module.css";

const Card = (pokemons) => {
  const { id, name, image, types } = pokemons;

  const getBackgroundColor = () => {
    if (types && types.length > 0) {
      const primaryType = types[0].name;
      const backgroundStyle = typesBackground[primaryType] || {};

      return backgroundStyle;
    }
    return {};
  };

  return (
    <div
      className={style.container}
      style={getBackgroundColor()}>
      <h3 className="id"># {id}</h3>

      <Link to={`/detail/${id}`}>
        <img
          src={image}
          alt={name}
          className="img"
        />
      </Link>
      <h2 className="name">{name?.toUpperCase()}</h2>

      <div>
      {types?.map((type, index) => (
          <span key={index} className="type-name">
            {type.name}
            {index < types.length - 1 ? " " : ""}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
*/
import { Link } from "react-router-dom";
import typesBackground from "../../utils/colors";
import style from "./Card.module.css";

const Card = ({ id, name, image, types }) => {
  // Normalizar el formato de types
  const normalizedTypes = typeof types === 'string'
    ? [{ name: types }]
    : types;

  const getBackgroundColor = () => {
    if (normalizedTypes && normalizedTypes.length > 0) {
      const primaryType = normalizedTypes[0].name;
      const backgroundStyle = typesBackground[primaryType] || {};

      return backgroundStyle;
    }
    return {};
  };

  return (
    <div
      className={style.container}
      style={getBackgroundColor()}
    >
      <h3 className="id"># {id}</h3>

      <Link to={`/detail/${id}`}>
        <img
          src={image}
          alt={name}
          className={style.img} 
        />
      </Link>
      <h2 className="name">{name?.toUpperCase()}</h2>

      <div>
        {normalizedTypes?.map((type, index) => (
          <span key={index} className="type-name">
            {type.name}
            {index < normalizedTypes.length - 1 ? " " : ""}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;



/*import { Link } from "react-router-dom";
import typesBackground from "../../utils/colors";
import style from "./Card.module.css";

const Card = ({ id, name, image, types }) => {
  const getBackgroundColor = () => {
    if (types && types.length > 0) {
      const primaryType = types[0].name;
      const backgroundStyle = typesBackground[primaryType] || {};

      return backgroundStyle;
    }
    return {};
  };

  return (
    <div
      className={style.container}
      style={getBackgroundColor()}
    >
      <h3 className="id"># {id}</h3>

      <Link to={`/detail/${id}`}>
        <img
          src={image}
          alt={name}
          className="img"
        />
      </Link>
      <h2 className="name">{name?.toUpperCase()}</h2>

      <div>
        {types?.map((type, index) => (
          <span key={index} className="type-name">
            {type.name}
            {index < types.length - 1 ? " " : ""}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;*/



/*
import React from 'react';

const Card = ({ name, image, types }) => {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <div className="types">
        {Array.isArray(types) ? types.map((type) => (
          <span key={type}>{type}</span>
        )) : <span>No types available</span>}
      </div>
    </div>
  );
};

export default Card;

*/
