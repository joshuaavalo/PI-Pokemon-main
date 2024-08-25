import style from "./Landing.module.css";
import { Link } from "react-router-dom";
import Rutas from "../../helpers/pathRoutes";

const Landing = () => {

    return(
        
        <div className={`${style.container}`}>
             <div className={style.content}>
                <h1 className={style.title1}>Welcome to POKEMONS</h1>
                <h2 className={style.title}>Espero les guste.</h2>
                <Link to={Rutas.HOME}className={style.button}>Presione aquí para ingresar</Link>
             </div>
        </div>
        
    )
}

export default Landing;