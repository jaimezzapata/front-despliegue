import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);

            Swal.fire("Bienvenido", "Sesión iniciada correctamente", "success");
            navigate("/");
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Entrar
                    </button>
                    <Link
                        to="/register"
                        className="block text-center text-blue-600 hover:underline mt-4"
                    >
                        ¿No tienes cuenta? Regístrate
                    </Link>

                </form>
            </div>
        </div>
    );
}
