import { useState } from "react";

import { useForm } from "../hooks/useForm";
import { getOficial,saveOficial } from "../services/oficialAPI";


const form = {
    username: '',
    email: '',
    first_name:'',
    last_name:'',
    number_identification:'',
    password:'',
    password2:'',
    };
const Oficials = () => {
    const { formState,setFormState, onInputChange } = useForm(form);
    const[btn,setBtn]=useState(true)
    const oficialMutation = saveOficial();
    const {data, isLoading} =getOficial()

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
        oficialMutation.mutate([formState])
    }
    const handleEditar=(row)=>{
       setFormState(row)
       setBtn(false)
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
                        <th>Nombre completo</th>
                        <th>Email</th>
                        <th>Número Identificación</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && 
                        data.map((r)=>(
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.first_name} {r.last_name}</td>
                                <td>{r.email}</td>    
                                <td>{r.number_identification}</td>
                             
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
                        type="text" 
                        class="form-control" 
                        placeholder="Ingrese el nombre"
                        name="first_name"
                        value={formState?.first_name}
                        onChange={onInputChange}
                        />
                    </div>

                    <div class="mb-3">
                    <label for="nameFor1" class="form-label">Apellidos</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Ingrese los apellidos"
                        name="last_name"
                        value={formState.last_name}
                        onChange={onInputChange}
                        />
                    </div>
                    <div class="mb-3">
                    <label for="nameFor1" class="form-label">Número Identificación</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Ingrese número identificación"
                        name="number_identification"
                        value={formState?.number_identification}
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
                    <div class="mb-3">
                    <label for="emailFor1" class="form-label">Password</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        placeholder="Ingrese el password"
                        name="password"
                        value={formState?.password}
                        onChange={onInputChange}
                        />
                    </div>
                    <div class="mb-3">
                    <label for="emailFor1" class="form-label">Password confirmación</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        placeholder="Ingrese el password"
                        name="password2"
                        value={formState?.password2}
                        onChange={onInputChange}
                        />
                    </div>
                    
                        <button className="btn  btn-success" type="submit">Guarda</button>
                    
                </form>
                </>
            )
        }
       
        </>
     );
}
 
export default Oficials;