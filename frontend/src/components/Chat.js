import React,{useState,useEffect,useContext} from 'react'
import io from 'socket.io-client'
import AuthContext from '../Auth.Context'
import { useCookies} from "react-cookie";

const socket = io.connect('http://localhost:8080')

export default function Chat(){
    const [cookies, setCookie,removeCookie] = useCookies(['jwt']);
    const {checkToken,logout} = useContext(AuthContext)
    const [state,setState] = useState({message:'',token:''})
    const [chat,setChat] = useState([])
    const [success,setSuccess] = useState('')

    const handleSuccess = ()=>{
        return <div className='alert alert-success mt-2'>{success}</div>
    }

    useEffect(()=>{
        if(!cookies.jwt){
            window.location.assign('/')
        }
        checkToken(cookies.jwt)
        setState({...state,token:cookies.jwt})
    },[])

    const timeout = setTimeout(()=>{
        setSuccess('')
    },3000)

    useEffect(()=>{
        socket.on('message',(data)=>{
            setChat(data.reverse())
        })
        socket.on('error',(data)=>{
            if(data){
                window.location.assign('/')
            }
        })
    },[socket])

    const onTextChange = (e)=>{
        setState({...state,message:e.target.value})
    }

    const onMessageSubmit = (e)=>{
        e.preventDefault()
        const {token,message} = state
        socket.emit('message',{message,token})
        setSuccess('Message sent')
        setState({message:'',token})
    }

    const renderChats = ()=>{
        return chat.map(({name,message},index)=>(
            <div key={index}>
                <h5 className="text-muted">{name}: <span className="light-text">{message}</span></h5>
            </div>
        ))
    }
    return(
        <div className='m-5'>
            <button onClick={logout} className='btn btn-info'>Logout</button>
            {success.length > 0 && handleSuccess()}
            <div className='m-3'>
                <h3 className="h3">Chats</h3>
                <div className='scroll'>
                    {renderChats()}
                </div>

                <form onSubmit={onMessageSubmit} className="mt-5 d-flex">
                    <input name="message" className="form-control w-75" onChange={(e)=>onTextChange(e)} value={state.message} placeholder="message"/>
                    <button className="btn btn-info ml-1 send-button">Send</button>
                </form>
            </div>
        </div>
    )
}