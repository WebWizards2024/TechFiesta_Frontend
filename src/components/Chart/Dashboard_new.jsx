import React,{useEffect} from 'react'
import axios from 'axios';
function Dashboard_new() {

   useEffect(() => {
       axios
           .get(
               "/api/v1/health-data/getUser/67947f6157ad3640a7ac95d4",
               { withCredentials: true }
           )
           .then((res) => {
               console.log(res.data.data.healthData);
           })
           .catch((error) => {
               console.error(error);
   
           });
   },[]); 
  return (
    <div>
        <h1>sjnf</h1>
    </div>
  )
}

export default Dashboard_new