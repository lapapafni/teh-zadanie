import {useState, useContext} from 'react'
import {AuthContext} from "../context/authContext"
import {ModalWindow} from "../component/modal"
import axios from "axios"


export const LoginPage = () => {

    const auth = useContext(AuthContext)

    
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorUsername, setErrorUsername] = useState(false) 
    const [show, setShow] = useState(false)
    const [form, setForm] = useState({
        username: '', password: ''
    })

    

    const changeHandler = event => {
        setForm(
        {...form, [event.target.name]: event.target.value})
    }

    const blurHadler = (event) => {
        switch(event.target.name){
            case 'username':
                if(!form.username){
                    setErrorUsername(true)
                }
                
                break
            case 'password':
                if(!form.password){
                    setErrorPassword(true)
                }
                break
            default:
                setErrorPassword(false)
                setErrorUsername(false)
                break
        }
    }

    const loginHandler = async () => {
        try {
            const formData = new FormData();
            formData.append("username", form.username);
            formData.append("password", form.password);
        
        await axios({
            url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=ilia',
            crossDomain: true,
                method: 'POST',
                mimeType: "multipart/form-data",
                contentType: false,
                processData: false,
                data: formData,
                dataType: "json",
        })
          .then((response) => {
              if(!response.data.message.token){
                  setShow(true)
              }
              auth.login(response.data.message.token)
          })  
            
            
        } catch (e) {}

    }
    return (
        <div style={{paddingTop: 170}}>
            <ModalWindow 
            show={show}
            message={'Неправильные данные'}
            handleClose={() => setShow(false)}
            />
            <div className="text-center" cz-shortcut-listen="true">
                <div className="form-signin" style={{maxWidth: 350, margin: 'auto'}}>
                    <form>
            
                        <h1 className="h3 mb-3 fw-normal">Вход</h1>
        
                        <div className="form-floating">
                            <input onBlur={blurHadler} type="text" className="form-control" id="floatingInput" placeholder="Username" name='username' onChange={changeHandler}/>
                            <label htmlFor="floatingInput">Username</label>
                            {errorUsername && <div id="usernameHelp" className="form-text red">Поле с именем должно быть обязательно заполнено</div>}
                        </div>
                        <div className="form-floating">
                          <input onBlur={blurHadler} type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' onChange={changeHandler}/>
                          <label htmlFor="floatingPassword">Password</label>
                          {errorPassword && <div id="passwordHelp" className="form-text">Поле с паролем должно быть обязательно заполнено</div>}
                        </div>
        
            
                        <button className="w-100 btn btn-lg btn-primary" disabled={!form.username || !form.password} type="button" onClick={loginHandler}>Sign in</button>
            
                    </form>
                </div>
            </div>
        </div>
    )
}