import { useEffect, useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import backend_url from "../utils/backend_url"
import style from "styled-components"
const EvalCard = ({name,start_time, end_time, onClick} ) => {
    return <EvalCardBox onClick= {onClick}>
        <div>{name}</div>
        <div>Start time: {start_time}</div>
        <div>End time : {end_time}</div> 
    </EvalCardBox>
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
        <HomeBox>
            <LogoutBox onClick={logOut}>Log out</LogoutBox>
            <h1>Home page</h1>
            <div>
            {evalData.length > 0 && evalData.map((elem, id) => {
                return <EvalCard key={id} name = {elem.name} start_time = {elem.start} end_time = {elem.end} onClick={() => startAssignment(elem.id)}/>
            } )}
            </div>

        </HomeBox>
    
    </>
}
const HomeBox = style.div`
    padding:10px 30px;    

`
const LogoutBox = style.button`
    height:50px;
    width:100px;
    font-size:20px;
    cursor:pointer;
    background-color:white;
    border:1px solid gainsboro;
    
`
const EvalCardBox = style.div`
    
    border:1px solid gainsboro;
    width:300px;
    cursor:pointer;
    padding:20px;
    border-radius : 5px;
`