import {useState} from 'react'
import axios from 'axios'
import {ModalWindow} from '../component/modal'


export const CreatePage = () => {

    const [form, setForm] = useState({
        username: '', email: '', text: ''
    })

    
    const [errorUsername, setErrorUsername] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorText, setErrorText] = useState(false)
    const [show, setShow] = useState(false)
    const [validateEmail, setValidateEmail] = useState(false)
    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
         if(!re.test(String(event.target.value).toLowerCase()) && event.target.name === 'email'){
            setValidateEmail(true)
         }else setValidateEmail(false)
    }

    
        
      


    const blurHadler = (event) => {
        switch(event.target.name){
            case 'username':
                if(!form.username){
                    setErrorUsername(true)
                }else setErrorUsername(false) 
                
                break
            case 'email':
                if(!form.email){
                    setErrorEmail(true)
                }else setErrorEmail(false)
                break

            case 'text':
                if(!form.text){
                    setErrorText(true)
                }else setErrorText(false)
                break
            default:
                setErrorText(false)
                setErrorEmail(false)
                setErrorUsername(false)

        }
    }

    const pressHandler = async () => {
        try{

            const formData = new FormData();
                formData.append("username", form.username);
                formData.append("email", form.email);
                formData.append("text", form.text);

            await axios({
                url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=ilia',
                crossDomain: true,
                    method: 'POST',
                    mimeType: "multipart/form-data",
                    contentType: false,
                    processData: false,
                    data: formData,
                    dataType: "json",
            }).then(() => {
                setShow(true)
            })
            
            
        }catch(e){}
    }

    

    return (
        <form style={{paddingTop: 100, maxWidth: 500, margin: 'auto'}} >
            <ModalWindow 
            show={show}
            message={'Задача была успешно создана'}
            handleClose={() => setShow(false)}
            />
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput2" className="form-label">Username</label>
                <input onBlur={blurHadler} type="text" className="form-control" name='username' id="exampleFormControlInput2" onChange={changeHandler} />
                {errorUsername && <div id="usernameHelp" className="form-text red">Поле с именем должно быть обязательно заполнено</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email </label>
                <input onBlur={blurHadler} type="email" className="form-control" name='email' id="exampleFormControlInput1" placeholder="name@example.com" onChange={changeHandler}/>
                {errorEmail && <div id="emailHelp" className="form-text red">Поле с email должно быть обязательно заполнено</div>}
                {validateEmail && <div id="emailHelp" className="form-text red">Введен некорректный email</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Text</label>
                <textarea onBlur={blurHadler} className="form-control" name='text' id="exampleFormControlTextarea1" rows="3" onChange={changeHandler}/>
                {errorText && <div id="usernameHelp" className="form-text red">Нужно написать текст задачи для добавления</div>}
            </div>
            <button className="w-100 btn btn-lg btn-primary" disabled={!form.username || !form.text || !form.email || validateEmail} onClick={pressHandler} type='button'>Sign in</button>
        </form>
    )
}    