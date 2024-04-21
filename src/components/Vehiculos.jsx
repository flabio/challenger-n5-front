import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { getVehiculos, removeVehiculo, saveVehiculo, updateVehiculo } from "../services/vehiculoAPI";
import { getPersonas } from "../services/productoAPI";

const form = {
    placa: '',
    marca: '',
    color:'',
    persona:0
    };
const Vehiculos = () => {
    const { formState,setFormState, onInputChange } = useForm(form);
    const[btn,setBtn]=useState(true)
    const vehiculoMutation = saveVehiculo();
    const removeVehiculoMutation = removeVehiculo();
    const updateVehiculoMutation=updateVehiculo();
    const {data, isLoading} =getVehiculos()
    const {data:personas=[]} =getPersonas()


    const buttonCreate=(e)=>{
        e.preventDefault()
        setBtn(false)
    }
    const buttonList=(e)=>{
        e.preventDefault()
        setBtn(true)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
       
        if(formState?.id>0){
            updateVehiculoMutation.mutate([formState,formState.id])
            return
        }else{
            vehiculoMutation.mutate([formState])
            return
        }
    }
  
    const handleEditar=(row)=>{
       setFormState(row)
       setBtn(false)
    }
    const handleRemove=(id)=>{
        removeVehiculoMutation.mutate([id])
    }
    return ( 
        <>
        <button className="btn btn-outline-primary m-1" onClick={buttonCreate}>Crear</button>
        <button className="btn btn-outline-success" onClick={buttonList}>Listado</button>
        <hr/>
        {
            
            btn?(

                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Placa</th>
                        <th>Marca</th>
                        <th>Color</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && 
                        data.map((r)=>(
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.placa}</td>
                                <td>{r.marca}</td>
                                <td>{r.color}</td>    
                                <td>
                                <button className="btn btn-warning m-1" onClick={()=>handleEditar(r)}>Editar</button>
                                    <button className="btn btn-danger" onClick={()=>handleRemove(r.id)}>ELiminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            ):(
                <>
              
                 <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                    <label for="placaFor1" class="form-label">Placa</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Ingrese la placa"
                        name="placa"
                        value={formState.placa}
                        onChange={onInputChange}
                        />
                    </div>
                    <div class="mb-3">
                    <label for="marcaFor1" class="form-label">Marca</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Ingrese la marca"
                        name="marca"
                        value={formState?.marca}
                        onChange={onInputChange}
                        />
                    </div>
                    <div class="mb-3">
                    <label for="colorFor1" class="form-label">Color</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Ingrese el color"
                        name="color"
                        value={formState?.color}
                        onChange={onInputChange}
                        />
                    </div>
                    <div class="mb-3">
                    <label for="colorFor1" class="form-label">Persona</label>
                 
                        <select 
                            class="form-control" 
                            name="persona"   
                            value={formState.persona}
                            onChange={onInputChange}>
                            <option value="0">----</option>
                            {
                             personas&&  personas.map((p)=>(
                                <option key={p.id} value={p.id}>{p.name}</option>
                               ))
                            }
                        </select>
                    </div>
                    {
                        formState?.id?(<button className="btn  btn-info" type="submit">Editar</button>):(<button className="btn  btn-success" type="submit">Guarda</button>)
                    }
                    
                </form> 
                </>
            )
        }
       
        </>
     );
}
 
export default Vehiculos;