import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import AuthContextProvider from './context/AuthContext'
import Home from './components/Home'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={< Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
