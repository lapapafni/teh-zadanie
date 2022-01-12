import { BrowserRouter } from "react-router-dom";
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./context/authContext"
import {useRoutes} from "./routes"
import {Navbar} from './component/navbar'


function App() {
  const {login, logout, token, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  

  if(!ready){

    return <progress />

  }

  return (
    <AuthContext.Provider value={{ login, token, userId, logout, isAuthenticated }}>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          {routes}
        </div>
      </BrowserRouter>  
    </AuthContext.Provider>  
  );
}



export default App;