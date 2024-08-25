import { Route, Routes } from "react-router-dom";

import Rutas from "./helpers/pathRoutes";
import { Landing, Form, Detail, Home } from "./views";
//import NavBar from "./components/NaBar/NavBar";

function App() {

  return (
    <div>
      
      <Routes>
        <Route path={Rutas.LANDING} element={<Landing />}/>
        <Route path={Rutas.FORM} element={<Form />}/>
        <Route path={Rutas.DETAIL} element={<Detail />}/>
        <Route path={Rutas.HOME} element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
