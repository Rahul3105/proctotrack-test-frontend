import { useEffect, useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import backend_url from "../utils/backend_url"
const EvalCard = ({name, onClick} ) => {
    return <div onClick= {onClick}>
        <div>{name}</div>
        <div>From {"26 May, 12:00 PM"} to {"26 May, 01:00 PM"}</div> 
    </div>
}
export const Home = () => {
    const navigate = useNavigate()
    let [evalData, setEvalData] = useState([])
    useEffect ( ()=>{
        async function getData ( ) {
            let res = await axios.get(`${backend_url}/show-exam`)
            setEvalData(res.data)
        }
        getData()
    },[])
    const startAssignment = async ( id ) => {
        console.log(id)
        let res = await axios.post(`${backend_url}/start-assignment/${id}`,null, {
            headers : {
                authentication : `bearer ${localStorage.getItem("token")}`
            }
        })
        window.location.href = res.data.url;
    }
    const logOut =  () => {
        localStorage.removeItem("token")
        navigate({ pathname: '/login' })
    }
    return <>
        <div>
            <button onClick={logOut}>Log out</button>
            <h1>Home page</h1>
            <div>
            {evalData.length > 0 && evalData.map((elem, id) => {
                return <EvalCard key={id} name = {elem.name} onClick={() => startAssignment(elem.id)}/>
            } )}
            </div>

        </div>
    
    </>
}
