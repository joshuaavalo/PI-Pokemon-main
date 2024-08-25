import { Link } from "react-router-dom";
import Rutas from "../../helpers/pathRoutes"; // CON ESTO TENEMOS UN ACCESO RAPIDO A TODAS NUESTRAS RUTAS Y LAS PODEMOS ACTUALIZAR DESDE ALLI.
import style from "./NavBar.module.css";

const NavBar = () => {
    return (
        <div className={style.mainContainer}>
            <section>
                <h1 className={style.h1}> PI Pokemons</h1>
            </section>
            <section className={style.buton}>
                
                
                <Link to={Rutas.LANDING}> INICIO</Link>
                

            </section>
            <section className={style.buton}>
                
                
                <Link to={Rutas.FORM}> CREATE POKEMON</Link>
                

            </section>
        </div>
    )
};

export default NavBar; 

//cuidado con los helpers
