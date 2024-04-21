import { useState } from "react";
import {getPersonas,savePersona,removePersona,updatePersona} from "../services/productoAPI";
import { useForm } from "../hooks/useForm";

const form = {
    name: '',
    email: '',
    };
const Personas = () => {
    const { formState,setFormState, onInputChange } = useForm(form);
    const[btn,setBtn]=useState(true)
    const personaMutation = savePersona();
    const removePersonaMutation = removePersona();
    const updatePersonaMutation=updatePersona();
    const {data, isLoading} =getPersonas()

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
            updatePersonaMutation.mutate([formState,formState.id])
            return
        }else{
            personaMutation.mutate([formState])
            return
        }
        
  
    }
    const handleEditar=(row)=>{
       setFormState(row)
       setBtn(false)
    }
    const handleRemove=(id)=>{
        removePersonaMutation.mutate([id])
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
                        <th>Nombre</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && 
                        data.map((r)=>(
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.name}</td>
                                <td>{r.email}</td>    
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
                    <label for="nameFor1" class="form-label">Nombre</label>
                    <input 
                        type="name" 
                        class="form-control" 
                        placeholder="Ingrese el nombre"
                        name="name"
                        value={formState.name}
                        onChange={onInputChange}
                        />
                    </div>
                    <div class="mb-3">
                    <label for="emailFor1" class="form-label">Email</label>
                    <input 
                        type="email" 
                        class="form-control" 
                        placeholder="Ingrese el email"
                        name="email"
                        value={formState?.email}
                        onChange={onInputChange}
                        />
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
 
export default Personas;