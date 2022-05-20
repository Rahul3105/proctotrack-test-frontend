import {Routes, Route} from"react-router-dom";
import {Login} from "../pages/Login";
import {Home} from "../pages/Home"
import { Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem("token"); 
    return token ? <Home /> : <Navigate to="/login" />;
}
export const Path =  () => {
    return <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path = "/home" element = {<PrivateRoute/>}/>
    </Routes>
}
