import {createContext} from 'react'
import { useCookies} from "react-cookie";
import React from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function Context({children}){
    const [cookies, setCookie,removeCookie] = useCookies(['jwt']);
    const [errors,setErrors] = React.useState([])
    const [success,setSuccess] = React.useState([])
    const register = (username,password)=>{
        const userObj = {
            username,
            password
        }
        axios.post('http://localhost:8080/register',userObj)
            .then((user)=>{
                if(user.data.success){
                    setCookie('jwt',user.data.token)
                    setSuccess(user.data.message)
                    setErrors([])
                }
                else{
                    setSuccess([])
                    removeCookie('jwt')
                    setErrors(user.data.message)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    const login = (username,password)=>{
        const userObj = {
            username,
            password
        }
        axios.post('http://localhost:8080/login',userObj)
            .then((user)=>{
                if(user.data.success){
                    setCookie('jwt',user.data.token)
                    setSuccess(user.data.message)
                    setErrors([])
                }
                else{
                    setSuccess([])
                    removeCookie('jwt')
                    setErrors(user.data.message)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    const checkToken = (token)=>{
        const reqObj = {
            token
        }
        axios.post('http://localhost:8080/check/user/token',reqObj)
            .then((user)=>{
                if(user.data.success === false){
                    window.location.assign('/')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    const logout = ()=>{
        removeCookie('jwt')
        window.location.assign('/')
    }

    const values = {
        register,
        login,
        checkToken,
        logout,
        errors,
        success
    }
    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext