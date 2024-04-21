import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { getVehiculos } from "../services/vehiculoAPI";

import { getInfracciones, removeInfraccion, saveInfraccion, updateInfraccion } from "../services/InfraccionAPI";

const form = {
    placa_patente:0,
    time_infringement: '',
    comment:''
    };
const Infracciones = () => {
    const { formState,setFormState, onInputChange } = useForm(form);
    const[btn,setBtn]=useState(true)

    const {data, isLoading} =getVehiculos()
    const {data:infracciones=[]}=getInfracciones()
    const saveInfraccionData=saveInfraccion()
    const updateInfraccionData=updateInfraccion()
    const removeInfraccionData=removeInfraccion()
    


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
            updateInfraccionData.mutate([formState,formState.id])
            return
        }else{
            saveInfraccionData.mutate([formState])
            return
        }
    }
  
    const handleEditar=(row)=>{
       setFormState(row)
       setBtn(false)
    }
    const handleRemove=(id)=>{
        removeInfraccionData.mutate([id])
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
                        <th>Tiempo </th>
                        <th>Comentario</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        infracciones && 
                        infracciones.map((r)=>(
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.placa}</td>
                                <td>{r.time_infringement}</td>
                                <td>{r.comment}</td>
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
                    <label for="nameFor1" class="form-label">Comentario</label>
                    <textarea  
                    class="form-control" 
                        name="comment"
                        value={formState.comment}
                        onChange={onInputChange}>

                    </textarea>
                   
                    </div>
                    <div class="mb-3">
                    <label for="emailFor1" class="form-label">Tiempo</label>
                    <input 
                        type="date" 
                        class="form-control" 
                        name="time_infringement"
                        value={formState?.time_infringement}
                        onChange={onInputChange}
                        />
                    </div>
                    <div class="mb-3">
                    <label for="colorFor1" class="form-label">Placa</label>
                 
                        <select 
                            class="form-control" 
                            name="placa_patente"   
                            value={formState.placa_patente}
                            onChange={onInputChange}>
                                <option value="0">-------</option>
                            {
                             data&&  data.map((r)=>(
                                <option key={r.id} value={r.id}>{r.placa}</option>
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
 
export default Infracciones;