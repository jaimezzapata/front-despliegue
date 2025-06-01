import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { alertaConfirmacion, alertaError, alertaExito } from "../utils/alertas";
import categorias from "../data/categorias";
import validarSuscripcion from "../utils/validarSuscripcion";
import { actualizarSuscripcion, obtenerSuscripcionPorId } from "../api/suscripciones";

export default function EditarSuscripcion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [formulario, setFormulario] = useState({
    nombre: "",
    precio: "",
    moneda: "USD",
    categoria: "",
    cicloFacturacion: "mensual",
    proximaFacturacion: "",
    notas: ""
  });

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await obtenerSuscripcionPorId(id);
        if (data.usuarioId !== usuario.uid) throw new Error("Acceso denegado");
        setFormulario(data);
      } catch (error) {
        alertaError(error.message);
        navigate("/dashboard");
      } finally {
        setCargando(false);
      }
    };
    if (usuario) cargarDatos();
  }, [id, usuario, navigate]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validaciones = validarSuscripcion(formulario);
    if (Object.keys(validaciones).length > 0) {
      setErrores(validaciones);
      return;
    }

    const confirmacion = await alertaConfirmacion({
      titulo: "¿Actualizar suscripción?",
      texto: "Se guardarán los nuevos datos",
      confirmacion: "Sí, actualizar",
      cancelacion: "Cancelar"
    });

    if (!confirmacion.isConfirmed) return;

    try {
      await actualizarSuscripcion(id, formulario);
      alertaExito("Actualizado", "La suscripción fue modificada");
      navigate("/dashboard");
    } catch (error) {
      alertaError(error.message);
    }
  };

  if (cargando) return <p>Cargando...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Editar Suscripción</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="nombre" type="text" value={formulario.nombre} onChange={handleChange} className="p-2 border rounded" />
        {errores.nombre && <p className="text-red-600 text-sm">{errores.nombre}</p>}

        <input name="precio" type="number" value={formulario.precio} onChange={handleChange} className="p-2 border rounded" />
        {errores.precio && <p className="text-red-600 text-sm">{errores.precio}</p>}

        <input name="moneda" type="text" value={formulario.moneda} onChange={handleChange} className="p-2 border rounded" />
        {errores.moneda && <p className="text-red-600 text-sm">{errores.moneda}</p>}

        <select name="categoria" value={formulario.categoria} onChange={handleChange} className="p-2 border rounded">
          <option value="">Seleccione una categoría</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errores.categoria && <p className="text-red-600 text-sm">{errores.categoria}</p>}

        <select name="cicloFacturacion" value={formulario.cicloFacturacion} onChange={handleChange} className="p-2 border rounded">
          <option value="mensual">Mensual</option>
          <option value="semanal">Semanal</option>
          <option value="anual">Anual</option>
        </select>

        <input name="proximaFacturacion" type="date" value={formulario.proximaFacturacion} onChange={handleChange} className="p-2 border rounded" />
        {errores.proximaFacturacion && <p className="text-red-600 text-sm">{errores.proximaFacturacion}</p>}

        <textarea name="notas" value={formulario.notas} onChange={handleChange} className="p-2 border rounded" />

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
