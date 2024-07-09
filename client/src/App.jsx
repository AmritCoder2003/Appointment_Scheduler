
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Home2 from './User/Home2'
import Spinner from './components/Spinner'
import Layout from './User/Layout'
import { useSelector } from 'react-redux'
import ProtectRoute from './components/ProtectRoute'
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

    </Routes>
    </BrowserRouter>
  )
}

export default App
