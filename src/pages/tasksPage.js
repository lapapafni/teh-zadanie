import axios from 'axios'
import {useState, useCallback, useEffect} from "react"
import {Link} from 'react-router-dom'
import {useContext} from 'react'

import {AuthContext} from "../context/authContext"
import {Paginate} from "../component/paginate"
import {Filter} from "../component/filter"
import {Status} from '../component/status'

export const TasksPage = () => {
    const [tasksData, setTasksData] = useState([])
    const [loading, setLoading] = useState(false)
    const [numTasks, setNumTasks] = useState(0)
    const [page, setPage] = useState(1) 
    const [sortDirection, setSortDirection] = useState('asc')
    const [sortField, setSortField] = useState('')
    

    const {token} = useContext(AuthContext)
    

    const filterTasks = (event) => {

        switch(event.target.name){
            case 'sortDirection':
                if(event.target.checked){
                    localStorage.setItem(event.target.name, event.target.checked)
                    setSortDirection('desc')
                }else{
                    localStorage.removeItem(event.target.name)
                    setSortDirection('asc')
                }
                break

            case 'sortFieldId':
                if(event.target.checked){
                    localStorage.setItem(event.target.name, event.target.checked)
                    setSortField('id')
                    
                }else{
                    localStorage.removeItem(event.target.name)
                    setSortField('')
                }
                break
                
            case 'sortFieldUsername':
                if(event.target.checked){
                    localStorage.setItem(event.target.name, event.target.checked)
                    setSortField('username')

                }else{
                    localStorage.removeItem(event.target.name)
                    setSortField('')

                }
                break
            case 'sortFieldEmail':
                if(event.target.checked){
                    localStorage.setItem(event.target.name, event.target.checked)
                    setSortField('email')

                }else{
                    localStorage.removeItem(event.target.name)
                    setSortField('')

                }
                break
            case 'sortFieldStatus':
                if(event.target.checked){
                    localStorage.setItem(event.target.name, event.target.checked)
                    setSortField('status')

                }else{
                    localStorage.removeItem(event.target.name)
                    setSortField('')

                }
                break
            default:

        }
    }

    const getTask = useCallback(async () => {
        try{
            setLoading(true)
            await axios.get(
                `https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=ilia&page=${page}&sort_direction=${sortDirection}&sort_field=${sortField}`
                ).then((response) => {
                    setLoading(false)
                    setTasksData(response.data.message.tasks)
                    setNumTasks(response.data.message.total_task_count)
                    
                }, [page, sortDirection,sortField])  

        }catch(e){console.log(e)}

    }, [page, sortDirection,sortField])

    const nextPage = () => setPage(prev => prev+1)
    const previewPage = () => setPage(prev => prev-1)


    useEffect(() => {
        getTask()
    }, [getTask])


    if(loading){
        return <progress />
    }


    if(tasksData.length){

        return (
            <>
            <div style={{paddingTop: 10, width: 700}}>
                <h1>Задачи</h1>
                {tasksData.map((task) => 
                   <div className="card" style={{marginTop: 10}} key={task.id}>
                    <div className="card-body">
                      <h5 className="card-title">{task.username}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{task.email}</h6>
                      <Status status={task.status} />
                      <p className="card-text">{task.text}</p>
                      {!!token && <Link className='btn btn-primary' to={`/edit/${task.id}`} style={{position: 'absolute', right:20, top:50}}>Редактировать</Link>}
                    </div>
                  </div>
                )}
                <Paginate
                page={page}
                numTasks={numTasks}
                nextButton={nextPage}
                previewButton={previewPage}
                />
            </div>
            <Filter 
            filterTasks={filterTasks}
            /></>
        )
    }
    
    return <p>Задач нет, добавляйте</p>
}
        
