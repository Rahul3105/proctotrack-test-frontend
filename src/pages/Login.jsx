import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"
export const Login = () => {
    let [form, setForm] = useState({});
    const navigate = useNavigate()

    const handleChange  = (e) => {
        let {name, value} = e.target;
        setForm({...form, [name] : value})
    }
    const loginUser = async (  ) => {
        //login logic
        try {
            let res = await axios.post("http://localhost:4000/login", form);
            let token = res.data.token;
            localStorage.setItem("token", token)
            navigate({ pathname: '/home' })
        }catch(err) {
            alert("Something went wrong")
        }
    } 
    return <div>
        <input type="text" placeholder="Enter your email" name="email"  onChange={handleChange}/>
        <input type="text" placeholder="Enter your password" name = "password" onChange={handleChange}/>
        <button onClick={loginUser}>Login</button>
    </div>
}