import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Home2 from './User/Home2'
import Spinner from './components/Spinner'
import Layout from './User/Layout'
import DocForm from './Doctor/DocForm'
import { useSelector } from 'react-redux'
import ProtectRoute from './components/ProtectRoute'
import Notifications from './components/Notifications'
import UserList from './Admin/UserList'
import DoctorProfile from './Doctor/DoctorProfile'
import DoctorList from './Admin/DoctorList'
import AdminProfile from './Admin/AdminProfile'
import BookAppointment from './User/BookAppointment'
import UserAppointments from './User/UserAppointments'
import PageNotFound from './pages/PageNotFound'
import DoctorAppointments from './Doctor/DoctorAppointments'
function App() {
  const loading = useSelector((state)=>state.alerts.loading)
  return (
    <BrowserRouter>
    {loading && <Spinner/>}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
     <Route path='/home2' element={
        <ProtectRoute>
          <Home2/>
        </ProtectRoute>
     }/>
      <Route path='/layout' element={
        <ProtectRoute>
          <Layout/>
        </ProtectRoute>
      }/>
      <Route path='/docForm' element={
        <ProtectRoute>
          <DocForm/>
        </ProtectRoute>
      }/>
      
      <Route path='/notifications' element={
        <ProtectRoute>
          <Notifications/>
        </ProtectRoute>
      }/>

      <Route path='/users' element={
        <ProtectRoute>
          <UserList/>
        </ProtectRoute>
      }/>

      <Route path='/doctors' element={
        <ProtectRoute>
          <DoctorList/>
        </ProtectRoute>
      }/>

      <Route path='/doctor/profile/:id' element={
        <ProtectRoute>
          <DoctorProfile/>
        </ProtectRoute>
      }/>
      <Route path='/admin/profile' element={
        <ProtectRoute>
          <AdminProfile/>
        </ProtectRoute>
      }
      />
       <Route path='/book-appointment/:id' element={
        <ProtectRoute>
          <BookAppointment/>
        </ProtectRoute>
      }
      />

      <Route path='/doctor/appointments/' element={
        <ProtectRoute>
          <DoctorAppointments/>
        </ProtectRoute>
      }
      />
      <Route path='/user/appointments' element={
        <ProtectRoute>
          <UserAppointments/>
        </ProtectRoute>
      }
      />
      <Route path='*' element={<PageNotFound />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App

