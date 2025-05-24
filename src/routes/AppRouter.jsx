import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";


function AppRouter() {
    return ( 
    <BrowserRouter>
    <Routes>
    <Route path="/" element={< SignUp />} />
    <Route path="/SignUp" element={< SignUp />} />
    <Route path="/Login" element={< Login />} />
    <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
    );
}
export default AppRouter;