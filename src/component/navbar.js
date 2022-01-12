import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {AuthContext} from '../context/authContext'

export const Navbar = () => {
  
  const auth = useContext(AuthContext)

  function LogoutAuth(event){
    event.preventDefault()
    auth.logout()

  }

  function Auth(){
    if(auth.token){

        return <Link to={'/'} onClick={LogoutAuth} className="nav-link active">Выйти</Link>
    }else{
      return <Link to={'/login'} className="nav-link active">Войти</Link>
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to={"/"}>Задачи</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/create"}>Создать задачу</Link>
        </li>
        <li className="nav-item">
        <Auth />
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}