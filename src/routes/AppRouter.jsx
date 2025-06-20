import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Setting from "../pages/settings";
import CreateClass from "../pages/ClassCustomization";


function AppRouter() {
    return ( 
    <BrowserRouter>
    <Routes>
    <Route path="/" element={< SignUp />} />
    <Route path="/SignUp" element={< SignUp />} />
    <Route path="/Login" element={< Login />} />
    <Route path="/Setting" element={< Setting />} />
    <Route path="/CreateClass" element={< CreateClass />} />
    <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
    );
}
export default AppRouter;