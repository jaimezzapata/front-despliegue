import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AgregarSuscripcion from "../pages/AgregarSuscripcion";
import EditarSuscripcion from "../pages/EditarSuscripcion";
import CalendarioFacturaciones from "../pages/CalendarioFacturaciones";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "nueva",
                element: <AgregarSuscripcion />
            },
            {
                path: "editar/:id",
                element: <EditarSuscripcion />
            },
            {
                path: "calendario",
                element: <CalendarioFacturaciones />
            }
        ],
    },
]);

export default router;
