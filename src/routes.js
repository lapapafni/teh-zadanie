import {Routes, Route, Navigate} from 'react-router-dom'
import {LoginPage} from "./pages/loginPage"
import {CreatePage} from "./pages/createPage"
import {EditPage} from "./pages/editPage"
import {TasksPage} from "./pages/tasksPage"




export const useRoutes = (isAuthenticted) => {        

        if(isAuthenticted){

            return ( 
                <Routes>
                     <Route path='/' element={<TasksPage />} />
                     <Route path='/create' element={<CreatePage />} />
                     <Route path='/edit/:id' {...isAuthenticted}element={<EditPage />} />
                     <Route path="*" element={<Navigate to="/" />}/>
                     
                 </Routes>
                )

        }else{
            return ( 
                <Routes>
                     <Route path='/' element={<TasksPage />} />
                     <Route path='/login' element={<LoginPage />} />
                     <Route path='/create' element={<CreatePage />} />
                     <Route path="*" element={<Navigate to="/" />}/>
                     
                 </Routes>
                )
        }
   


}