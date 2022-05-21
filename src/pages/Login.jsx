import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import backend_url from "../utils/backend_url"
import style from "styled-components"
export const Login = () => {
    let [form, setForm] = useState({});
    const navigate = useNavigate()

    const handleChange  = (e) => {
        let {name, value} = e.target;
        setForm({...form, [name] : value})
    }
    const loginUser = async (  ) => {
        
        if (!form.email || !form.password || form.email === "" || form.password === "") {
            alert("Please fill your credentials")
            return;
        }
        //login logic
        try {
            let res = await axios.post(`${backend_url}/login`, form);
            let token = res.data.token;
            localStorage.setItem("token", token)
            navigate({ pathname: '/home' })
        }catch(err) {
            alert("Invalid credentials")
        }
    } 
    return <LoginBox>
        <input type="text" placeholder="Enter your email" name="email"  onChange={handleChange}/>
        <input type="text" placeholder="Enter your password" name = "password" onChange={handleChange}/>
        <button onClick={loginUser}>Login</button>
    </LoginBox>
}
const LoginBox = style.div`
    margin:auto;
    width:50%;
    margin-top:100px;
    & > input, & > button {
        display:block;
        width:100%;
        margin-bottom:10px;
        height: 40px;
        padding: 10px;
        box-sizing: border-box;
        border-radius : 5px;
    }
`