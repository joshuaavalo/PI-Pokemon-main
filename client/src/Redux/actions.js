import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const SEARCH_POKEMONS = "SEARCH_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const FILTER_POKEMONS_BY_TYPES = "FILTER_POKEMONS_BY_TYPES";
export const ORDER_POKEMONS_BY_NAME = "ORDER_POKEMONS_BY_NAME";
export const FILTER_POKEMONS_BY_SOURCE = "FILTER_POKEMONS_BY_SOURCE";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const GET_DETAILS = "GET_DETAILS";
export const POST_POKEMON = "POST_POKEMON";
export const RESET_FILTERS = "RESET_FILTERS";
export const CLEAR_DETAILS = "CLEAR_DETAILS";


export const getTypes = () => {
  return async function (dispatch) {
    const types = await axios.get(`/types`);

    return dispatch({
      type: GET_TYPES,
      payload: types.data,
    });
  };
};

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const fetchedPokemons = (await axios(`/pokemons`)).data;
      return dispatch({ type: GET_POKEMONS, payload: fetchedPokemons });
    } catch (error) {
       console.log(error.message);
    }
  };
};

export const searchPokemons = (nameOrId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/pokemons/?name=${nameOrId}`);
      const pokemon = response.data;
      dispatch({
        type: SEARCH_POKEMONS,
        payload: pokemon,
      });
    } catch (error) {
      alert(`El pokemon ${nameOrId} no existe`);
    }
  };
};

export const getPokemonsFilterByTypes = (filterTypes) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_POKEMONS_BY_TYPES,
      payload: filterTypes,
    });
  };
};

export const orderPokemonsByName = (ordered) => {
  return (dispatch) => {
    dispatch({
      type: ORDER_POKEMONS_BY_NAME,
      payload: ordered,
    });
  };
};

export const filterPokemonsBySource = (source) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_POKEMONS_BY_SOURCE,
      payload: source,
    });
  };
};

export const setCurrentPage = (page) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: page,
    });
  };
};

export const createPokemon = (payload) => {
  return async function (dispatch) {
    try {
      console.log("Payload:", payload); // Verifica el payload antes de enviar la solicitud
      await axios.post(`/create`, payload);
      return dispatch({
        type: POST_POKEMON,
      });
    } catch (error) {
      console.log("Error:", error); // Verifica si hay algún error capturado
    }
  };
};

export const getDetails = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/pokemons/${id}`);
      const pokemon = response.data;
      return dispatch({
        type: GET_DETAILS,
        payload: pokemon,
      });
    } catch (error) {
      // console.log(error);
    }
  };
};

export const clearDetails = () => {
  return {
    type: CLEAR_DETAILS,
  };
};

export const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};