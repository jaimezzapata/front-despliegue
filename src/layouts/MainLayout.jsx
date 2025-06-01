import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import Swal from "sweetalert2";

export default function MainLayout() {
    const { usuario } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente", "success");
            navigate("/login");
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Control de Suscripciones</h1>
                {usuario && (
                    <div className="flex items-center gap-4">
                        <span className="text-sm">
                            Bienvenido, <strong>{usuario.displayName}</strong>
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </header>

            {/* Navegación */}
            {usuario && (
                <nav className="bg-white shadow px-6 py-3 flex gap-6 text-blue-700 text-sm font-medium border-b">
                    <button onClick={() => navigate("/dashboard")} className="hover:underline">
                        Dashboard
                    </button>
                    <button onClick={() => navigate("/nueva")} className="hover:underline">
                        Nueva suscripción
                    </button>
                    <button onClick={() => navigate("/calendario")} className="hover:underline">
                        Calendario
                    </button>
                </nav>
            )}

            <main className="flex-1 p-4 bg-gray-100">
                <Outlet />
            </main>

            <footer className="bg-blue-600 text-white p-4 text-center">
                <p>&copy; {new Date().getFullYear()} Tu Nombre o Empresa</p>
            </footer>
        </div>
    );

}
