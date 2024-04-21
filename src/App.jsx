import { useState } from "react";
import { useForm } from "./hooks/useForm";
import "./App.css";
import Personas from "./components/Personas";
import Vehiculos from "./components/Vehiculos";
import Infracciones from "./components/Infracciones";
import Oficials from "./components/Oficials";
import Headers from "./headers";
import { getGenerarInformePersona,getGenerarInformePersonaSearch } from "./services/productoAPI.js";
const form = {
  email: "",
};
function App() {
  const { formState, setFormState, onInputChange } = useForm(form);
  const [mainOption, setMainOption] = useState(0);
  const[informe,setInforme]=useState({});
  const getGenereInforme=getGenerarInformePersonaSearch();
  
  const handlePersona = () => {
    setMainOption(0);
  };
  const handleVehiculo = () => {
    setMainOption(1);
  };
  const handleInfraccion = () => {
    setMainOption(2);
  };
  const handleOficial = () => {
    setMainOption(3);
  };
  const handleSubmit = (e) => { 
    
    e.preventDefault()
    // console.log("first")
    
    getGenereInforme.mutate([formState.email])
    setInforme(getGenereInforme?.data?.data)
    // console.log(informe)

  };
  return (
    <>
      <Headers />
      <div className="container">
      <button className="btn btn-link" onClick={handlePersona}>
        Persona
      </button>
      <button className="btn btn-link" onClick={handleVehiculo}>
        Vehiculos
      </button>
      <button className="btn btn-link" onClick={handleOficial}>
        Oficial
      </button>
      {localStorage.getItem("token") && (
        <button className="btn btn-link" onClick={handleInfraccion}>
          Infraccion
        </button>
      )}
      <hr/>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            name="email"
            value={formState?.email}
            onChange={onInputChange}
            placeholder="buscar por email"
          />
        </div>

        <div className="col-auto">
          <button type="submit" className="btn btn-danger">
            Buscar
          </button>
        </div>
      </form>

    
{
  informe?.email&&(
    <>
    <table className="table table-striped">
      <thead>
        <tr><th>Nombre</th><th>Email</th></tr>
      </thead>
      <tbody>
        <tr>
            <td>{informe.name}</td>
            <td>{informe.email}</td>
        </tr>
      </tbody>
    </table>
    <table className="table table-striped">
      <thead>
        <tr><th>Placa</th><th>Marca</th><th>Color</th></tr>
      </thead>
      <tbody>
        {
          informe.Vehiculolist &&informe.Vehiculolist.map((result)=>(
            <>
            <tr key={result.id}><td>{result.placa}</td><td>{result.marca}</td><td>{result.color}</td></tr>
            <hr/>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Placa Patente</th>
                  <th>Comentario</th>
                  <th>Tiempo infraccion</th>
                </tr>
              </thead>
              <tbody>
                {
                  result.infraccionlist&&result.infraccionlist.map((row)=>(
                    <tr key={row.id}>
                      <td>{row.placa}</td>
                      <td>{row.comment}</td>
                      <td>{row.time_infringement}</td>
                    </tr>
                  ))

                }
              </tbody>
            </table>
            </>
            
          ))
        }
      </tbody>
    </table>
    </>
  )
}
     
        {mainOption == 0 ? (
          <>
        
            <h1>Listado de Personas</h1>
            <Personas />
          </>
        ) : mainOption == 1 ? (
          <>
            {" "}
            <h1>Listado de Vehiculos</h1>
            <Vehiculos />
          </>
        ) :mainOption==2? (
          <Infracciones />
        ):(
          <Oficials/>
        )}
      </div>
    </>
  );
}

export default App;
