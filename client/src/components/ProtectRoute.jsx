import React from 'react'
import { Navigate,useNavigate } from 'react-router-dom'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setUser,reloadUserData } from '../redux/user'
import { showLoading,hideLoading } from '../redux/alert'
const ProtectRoute = (props) => {
  const {user,reloadUser}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const getUser=async()=>{
    dispatch(showLoading());
    try{

      const response = await axios.post("http://localhost:8000/api/user/userInfo",
      {},{

        headers:{

          Authorization: `Bearer ${localStorage.getItem("token")}`

        }
      })
      // console.log(response);
      // console.log(response.data);
      // console.log(response.data.data);
      dispatch(hideLoading());
      if(response.status===200){

        dispatch(setUser(response.data));
        dispatch(reloadUserData(false));
      }else{
        localStorage.removeItem('token');
        navigate('/login');
      }
    }catch(error){
      dispatch(hideLoading());
      localStorage.removeItem('token');
      navigate('/login');
      console.log(error);
    }
  }
  useEffect(() => {
    if(!user || reloadUser ){
      getUser();
    }
  }, [user,reloadUser]);

  if(localStorage.getItem('token')){
    return props.children;
  }
  else{
    return <Navigate to="/login"/>
  }
}

export default ProtectRoute;
