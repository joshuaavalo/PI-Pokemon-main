import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createPokemon, getPokemons, getTypes } from "../../Redux/actions";
import validations from "./validations";
import "./Form.Styles.css";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const types = useSelector((state) => state.types);
  const pokemonNames = useSelector((state) =>
    state.allPokemons.map((pokemon) => pokemon.name)
  );
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });

  function resetForm() {
    setInput({
      name: "",
      image: "",
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
    });
    setErrors({});
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validations({ ...input, [event.target.name]: event.target.value }, pokemonNames)
    );
  }

  function handleSelect(event) {
    if (input.types.includes(event.target.value)) {
      alert("⚠ You have already chosen that Type of Pokémon");
    } else {
      setInput({
        ...input,
        types: [...input.types, event.target.value],
      });
    }
    event.target.value = "default";
  }

  function handleClick(event) {
    const updatedTypes = input.types.filter((type) => type !== event.target.id);
    setInput({
      ...input,
      types: updatedTypes,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      Object.keys(errors).length === 0 &&
      input.name.length &&
      input.types.length > 0
    ) {
      const formattedInput = {
        name: input.name,
        image: input.image,
        life: parseInt(input.hp),
        attack: parseInt(input.attack),
        defense: parseInt(input.defense),
        speed: parseInt(input.speed),
        height: parseInt(input.height),
        weight: parseInt(input.weight),
        types: input.types,
        created: true,
      };

      dispatch(createPokemon(formattedInput))
        .then(() => {
          alert(`✅ Congratulations! you created the Pokémon ${input.name}.`);
          dispatch(getPokemons());
          resetForm();
          navigate("/home")
        })
        .catch((error) => {
          alert(`❌ Error creating Pokémon: ${error.message}`);
          setErrors({ general: `Error creating Pokémon: ${error.message}` });
        });
    } else {
      alert("❌ Please fill in all required fields correctly.");
    }
  }

  return (
    <div>
      <div className="container-main">
        <div className="container-form">
          <h1>CREATE POKÉMON</h1>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div>
              <label>* Name </label>
              <input
                type="text"
                value={input.name}
                name="name"
                autoComplete="off"
                spellCheck="false"
                onChange={handleChange}
              />
            </div>
            {errors.name && <p className="error">{errors.name}</p>}

            <div>
              <label>* URL Imagen </label>
              <input
                value={input.image}
                name="image"
                title="Image URL"
                placeholder="URL imagen..."
                autoComplete="off"
                spellCheck="false"
                onChange={handleChange}
              />
              {errors.image && <p className="error">{errors.image}</p>}
            </div>

            <div>
              <label>* HP</label>
              <input
                type="range"
                min="0"
                max="500"
                value={input.hp}
                name="hp"
                onChange={handleChange}
              />
              {errors.hp && <p className="error">{errors.hp}</p>}
            </div>
            <div>
              <label>* Attack</label>
              <input
                type="range"
                min="0"
                max="500"
                value={input.attack}
                name="attack"
                onChange={handleChange}
              />
              {errors.attack && <p className="error">{errors.attack}</p>}
            </div>
            <div>
              <label>* Defense</label>
              <input
                type="range"
                min="0"
                max="500"
                value={input.defense}
                name="defense"
                onChange={handleChange}
              />
              {errors.defense && <p className="error">{errors.defense}</p>}
            </div>
            <div>
              <label> Speed</label>
              <input
                type="range"
                min="0"
                max="500"
                value={input.speed}
                name="speed"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Height</label>
              <input
                type="range"
                min="0"
                max="500"
                value={input.height}
                name="height"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Weight</label>
              <input
                type="range"
                min="0"
                max="500"
                value={input.weight}
                name="weight"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>* Types </label>
              <select
                value="default"
                onChange={(event) => handleSelect(event)}
              >
                <option disabled value="default">
                  Select Types
                </option>
                {input.types.length < 2 ? (
                  types.map((type) => (
                    <option value={type.name} key={type.name}>
                      {type.name.toUpperCase()}
                    </option>
                  ))
                ) : (
                  <option value="full" disabled>
                    You can only choose 2 types
                  </option>
                )}
              </select>
              {errors.types && <p className="error">{errors.types}</p>}
            </div>

            <p>* Required fields</p>
            <div className="container-button">
              <button
                className="submit-button"
                disabled={Object.keys(errors).length > 0}
                type="submit"
              >
                Submit
              </button>

              <Link to="/home">
                <button className="submit-button" type="submit">
                  Cancel
                </button>
                </Link>
            </div>
          </form>
        </div>
        <div className="container-cards">
          <div className="container-image">
            <h2> {input.name || "Name"}</h2>
            {input.image && (
              <div>
                <img src={input.image} alt="Not found" style={{maxWidth:"150px"}} />
              </div>
            )}
          </div>
          <div className="container-info">
            <h2 className="stats"> Stats </h2>
            <p className="stats">HP: {input.hp}</p>
            <p className="stats">Attack: {input.attack}</p>
            <p className="stats">Defense: {input.defense}</p>
            <p className="stats">Speed: {input.speed}</p>
            <p className="stats">Height: {input.height}</p>
            <p className="stats">Weight: {input.weight}</p>
            <h2 className="stats"> Type </h2>
            <div className="container-type">
              {input.types.map((selected) => (
                <div key={selected}>
                  <p>{selected.toUpperCase()}</p>

                  <button
                    className="delete-button"
                    id={selected}
                    onClick={handleClick}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;


