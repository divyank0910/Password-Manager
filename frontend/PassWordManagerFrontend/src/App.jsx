import React from 'react'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import NotFound from './Pages/NotFound'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Auth from './Middleware/auth'
import { Toaster } from 'react-hot-toast'
import { PassContextProvider } from './Context/PassContext'
function App() {
  return (
    <>
    <Toaster position='top-center'/>
    <BrowserRouter>
    <PassContextProvider> 
       <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route element={<Auth/>}> 
          <Route path="/" element={<Home/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes></PassContextProvider>
    
    </BrowserRouter>
    </>
  )
}

export default App
