import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Crea el usuario con Firebase
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            // Agrega el nombre al perfil (opcional)
            await updateProfile(user, { displayName: nombre });
            Swal.fire("Registro exitoso", "Ahora puedes iniciar sesión", "success");
            navigate("/login");
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Crear Cuenta</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="mt-1 w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
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
                        Registrarse
                    </button>
                    <Link
                        to="/login"
                        className="block text-center text-blue-600 hover:underline mt-4"
                    >
                        ¿No tienes cuenta? Regístrate
                    </Link>

                </form>
            </div>
        </div>
    );
}
