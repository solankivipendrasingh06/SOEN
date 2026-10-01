import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from '../src/screens/home.jsx'
import Login from '../src/screens/login.jsx'
import Register from '../src/screens/register.jsx'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}