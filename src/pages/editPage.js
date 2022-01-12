import axios from 'axios'
import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import {AuthContext} from '../context/authContext'
import {ModalWindow} from '../component/modal'

export const EditPage = () => {

    const {id} = useParams()
    const auth = useContext(AuthContext)
    const [check, setChecked] = useState(false)
    const [text, setText] = useState(null)
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('Задача успешно отредактирована')

    const pressHandler = async () => {
        const formData = new FormData()

        formData.append("token", auth.token)

        if(text){
            if(check){
                formData.append("status", 11)
                formData.append("text", text)
            }else{
                formData.append("status", 1)
                formData.append("text", text)
            }
            
        }else{
            if(check){
                formData.append("status", 10)
            }else formData.append("status", 0)
            
        }
        

        await axios({
            url: `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=ilia`,
            crossDomain: true,
                method: 'POST',
                mimeType: "multipart/form-data",
                contentType: false,
                processData: false,
                data: formData,
                dataType: "json",
        })
        .then(() => {
            setShow(true)
            if(!localStorage.getItem('userData')){
                setMessage('Задача не сохранена, войдите на сайт еще раз.')
            }
        })
    }

    return (

        <form style={{paddingTop: 100, maxWidth: 500, margin: 'auto'}} >
            <ModalWindow 
            show={show}
            message={message}
            handleClose={() => setShow(false)}
            />
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Example textarea</label>
                <textarea className="form-control" name='text' id="email" rows="3" onChange={(e) => setText(e.target.value)}/>
            </div>
            <input checked={check} type='checkbox' onChange={() => setChecked(!check)}/> Выполнена?
            <button className="w-100 btn btn-lg btn-primary" onClick={pressHandler} type='button'>Sign in</button>
        </form>

    )
}