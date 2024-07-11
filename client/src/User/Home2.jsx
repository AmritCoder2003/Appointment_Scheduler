import React,{useEffect} from "react";
import axios from "axios";
import Layout from "./Layout";
function Home2() {
    useEffect(() => {
        const getData=async()=>{
            try{
                const response = await axios.post("http://localhost:8000/api/user/userInfo",
                   
                {},{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
                );
                console.log(response.data);
            }catch(error){
                console.log(error);
            }
        }
        getData();
    }, []);
    return (
        <Layout>
            <h1>Home2</h1>
        </Layout>
    );
}

export default Home2