import React from 'react'
import { Navigate } from 'react-router-dom'
const ProtectRoute = (props) => {
  if(localStorage.getItem('token')){
    return props.children;
  }
  else{
    return <Navigate to="/login"/>
  }
}

export default ProtectRoute;
