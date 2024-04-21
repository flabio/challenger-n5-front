import { useForm } from "./hooks/useForm";
import { getLoginData, getLogoutData } from "./services/authAPI";


const form = {
  email: '',
  password: ''
  };

const Headers = () => {
  const { formState,setFormState, onInputChange } = useForm(form);
  const login=getLoginData()

  const handleLogin=(e)=>{
    e.preventDefault()
    login.mutate([formState])
  }
  const handleLogout=(e)=>{
    e.preventDefault()
    localStorage.setItem("token","")
    getLogoutData()
  }
    return (  <>
    <div className="container">
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div className="col-md-3 mb-2 mb-md-0">
        <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
          <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>
      </div>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 ">
        {
          localStorage.getItem("token")?(
            <><h4>{localStorage.getItem("full_name")}</h4></>
          ):(<>
            <li>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="ingrese el email"
            value={formState.email}
            onChange={onInputChange}

          />
        </li>
        <li >
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="ingrese el password"
            value={formState.password}
            onChange={onInputChange}
          
          />
        </li>
            </>)
        }
        

      </ul>

      <div className="col-md-3 text-end">

        <button type="button" className="btn btn-outline-primary me-2" onClick={handleLogin}>Login</button>
        <button type="button" className="btn btn-primary" onClick={handleLogout}>Cerrar</button>
      </div>
     
    </header>
  </div>
    </>);
}
 
export default Headers;