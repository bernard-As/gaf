import { useState } from "react";
import Login from "./Login";
import AdminTable from "./AdminTable";

const Admin = ()=>{
   const  token = localStorage.getItem('token');
    const [isLogin, setIsLogin] = useState(Boolean(token));
    
    return(
        !isLogin?<Login f={setIsLogin}/>:
        <AdminTable f={setIsLogin}/>
    )
}
export default Admin;