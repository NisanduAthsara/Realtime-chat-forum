import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login'
import Register from './components/Register'
import {Context} from './Auth.Context'
import { CookiesProvider } from "react-cookie";

export default function App(){
    return(
        <CookiesProvider>
        <Context>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/chats" element={<Chat/>}/>
            </Routes>
        </BrowserRouter>
        </Context>
        </CookiesProvider>
    )
}