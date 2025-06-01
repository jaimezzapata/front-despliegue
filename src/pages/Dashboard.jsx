import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { obtenerSuscripcionesPorUsuario, eliminarSuscripcion } from "../api/suscripciones";
import { alertaConfirmacion, alertaExito, alertaError } from "../utils/alertas";
import categorias from "../data/categorias";
import { useNavigate } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";
import CalendarioFacturaciones from "./CalendarioFacturaciones";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);


export default function Dashboard() {
    const navigate = useNavigate();
    const { usuario } = useAuth();
    const [suscripciones, setSuscripciones] = useState([]);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [orden, setOrden] = useState("");
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarSuscripciones = async () => {
            try {
                const data = await obtenerSuscripcionesPorUsuario(usuario.uid);
                setSuscripciones(data);
            } catch (error) {
                console.error("Error al cargar suscripciones:", error);
            } finally {
                setCargando(false);
            }
        };
        if (usuario) {
            cargarSuscripciones();
        }
    }, [usuario]);

    const handleEliminar = (id) => {
        alertaConfirmacion({
            titulo: "¿Eliminar suscripción?",
            texto: "Una vez eliminada no podrás recuperarla",
            confirmacion: "Sí, eliminar",
            cancelacion: "No, cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await eliminarSuscripcion(id);
                    setSuscripciones(suscripciones.filter((s) => s.id !== id));
                    alertaExito("Eliminado", "La suscripción fue eliminada.");
                } catch (error) {
                    alertaError(error.message);
                }
            }
        });
    };

    const totalSuscripciones = suscripciones.length;
    const totalGasto = suscripciones.reduce((sum, sub) => sum + sub.precio, 0);
    const porCategoria = suscripciones.reduce((acc, sub) => {
        acc[sub.categoria] = (acc[sub.categoria] || 0) + 1;
        return acc;
    }, {});

    const categoriasLabels = Object.keys(porCategoria);
    const categoriasData = Object.values(porCategoria);

    const datosPastel = {
        labels: categoriasLabels,
        datasets: [
            {
                data: categoriasData,
                backgroundColor: [
                    "#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#F43F5E"
                ]
            }
        ]
    };

    const datosBarras = {
        labels: categoriasLabels,
        datasets: [
            {
                label: "Cantidad de suscripciones",
                data: categoriasData,
                backgroundColor: "#3B82F6"
            }
        ]
    };


    const suscripcionesFiltradas = suscripciones
        .filter((sub) => {
            return (
                sub.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
                (filtroCategoria ? sub.categoria === filtroCategoria : true)
            );
        })
        .sort((a, b) => {
            switch (orden) {
                case "precio-asc":
                    return a.precio - b.precio;
                case "precio-desc":
                    return b.precio - a.precio;
                case "fecha-asc":
                    return new Date(a.proximaFacturacion) - new Date(b.proximaFacturacion);
                case "fecha-desc":
                    return new Date(b.proximaFacturacion) - new Date(a.proximaFacturacion);
                default:
                    return 0;
            }
        });

    if (cargando) return <p>Cargando suscripciones...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Tus Suscripciones</h2>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Columna izquierda: filtros + listado */}
                <div className="md:col-span-2 space-y-6">
                    {/* Filtros */}
                    <div className="flex flex-col gap-4 md:flex-row">
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={filtroNombre}
                            onChange={(e) => setFiltroNombre(e.target.value)}
                            className="p-2 border rounded w-full"
                        />
                        <select
                            value={filtroCategoria}
                            onChange={(e) => setFiltroCategoria(e.target.value)}
                            className="p-2 border rounded w-full"
                        >
                            <option value="">Todas las categorías</option>
                            {categorias.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <select
                            value={orden}
                            onChange={(e) => setOrden(e.target.value)}
                            className="p-2 border rounded w-full"
                        >
                            <option value="">Ordenar por</option>
                            <option value="precio-asc">Precio: Menor a mayor</option>
                            <option value="precio-desc">Precio: Mayor a menor</option>
                            <option value="fecha-asc">Fecha: Más próxima</option>
                            <option value="fecha-desc">Fecha: Más lejana</option>
                        </select>
                    </div>

                    {/* Listado */}
                    {suscripcionesFiltradas.length === 0 ? (
                        <p className="text-gray-600">No se encontraron suscripciones.</p>
                    ) : (
                        <div className="grid gap-4">
                            {suscripcionesFiltradas.map((sub) => (
                                <div key={sub.id} className="bg-white p-4 shadow rounded relative">
                                    <h3 className="text-lg font-semibold">{sub.nombre}</h3>
                                    <p className="text-sm text-gray-600">Categoría: {sub.categoria}</p>
                                    <p className="text-sm text-gray-600">Precio: ${sub.precio.toFixed(2)}</p>
                                    <p className="text-sm text-gray-600">Próxima facturación: {sub.proximaFacturacion}</p>

                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <button
                                            onClick={() => navigate(`/editar/${sub.id}`)}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Editar"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleEliminar(sub.id)}
                                            className="text-red-500 hover:text-red-700"
                                            title="Eliminar"
                                        >
                                            ❌
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Columna derecha: estadísticas y gráficos */}
                <div className="space-y-6">
                    <div className="bg-white shadow p-4 rounded">
                        <p className="text-lg font-semibold mb-2">Resumen</p>
                        <p>Total de suscripciones: {totalSuscripciones}</p>
                        <p>Gasto mensual estimado: ${totalGasto.toFixed(2)}</p>
                    </div>

                    <div className="bg-white shadow p-4 rounded flex flex-col items-center">
                        <p className="font-medium mb-2 text-center">Gráfico por categoría</p>
                        <div className="w-64 h-64">
                            <Pie data={datosPastel} />
                        </div>
                    </div>

                    <div className="bg-white shadow p-4 rounded">
                        <p className="font-medium mb-2 text-center">Suscripciones por categoría</p>
                        <Bar data={datosBarras} options={{ plugins: { legend: { display: false } } }} />
                    </div>
                    <CalendarioFacturaciones />

                </div>
            </div>
        </div>
    );

}
