/*import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from "../../Redux/actions";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Pagination from "../../components/Pagination/Pagination.Component";
import Loading from "../../components/Loading/Loading.Component";
import style from './Home.module.css';
import FiltersBar from '../../components/FiltersBar/FiltersBar.Component';
//import SideBar from '../../components/SideBar/SideBar';

const Home = () => { 
   const dispatch = useDispatch()
   const { allPokemons, pokemons, currentPage } = useSelector((state) => state);
  const loading = useSelector((state) => state.loading);
   
   useEffect(()=>{
    dispatch(getPokemons())
   },[dispatch]);

   const pokemons = useSelector((state) => state.pokemons); // Selector específico para 'pokemons'
   const currentPage = useSelector((state) => state.currentPage); // Selector específico para 'currentPage'
  
  return (
    
    <div className={style.homeContainer}>
      <div>
        <FiltersBar />
      </div>
      
      {loading ? (
        <Loading />
      ) : pokemons.length > 0 ? (
        <div className={style.content}>
          
          <CardsContainer
            allPokemons={allPokemons}
            pokemons={pokemons}
            currentPage={currentPage}
          />
          <Pagination />
        </div>
      ) : (
        <div>
          <h3 className="mensaje-error">No results found. </h3>
        </div>
      )}

      <br />
    </div>
  );
};

export default Home;*/

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../Redux/actions";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Pagination from "../../components/Pagination/Pagination.Component";
import Loading from "../../components/Loading/Loading.Component";
import style from "./Home.module.css";
import FiltersBar from "../../components/FiltersBar/FiltersBar.Component";
import NavBar from "../../components/NaBar/NavBar";

const Home = () => {
  const dispatch = useDispatch();

  // Selecciona solo las partes necesarias del estado
  const allPokemons = useSelector((state) => state.allPokemons);
  const pokemons = useSelector((state) => state.pokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    if (allPokemons.length === 0) {
      dispatch(getPokemons());
    }
  }, [dispatch, allPokemons.length]);

  return (
    <>
      <NavBar />

      <div className={style.homeContainer}>
        <div>
          <FiltersBar />
        </div>

        {loading ? (
          <Loading />
        ) : pokemons.length > 0 ? (
          <div className={style.content}>
            <CardsContainer pokemons={pokemons} currentPage={currentPage} />
            <Pagination />
          </div>
        ) : (
          <div>
            <h3 className="mensaje-error">No results found.</h3>
          </div>
        )}
        <br />
      </div>
    </>
  );
};

export default Home;
