import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { crearSuscripcion } from "../api/suscripciones";
import Swal from "sweetalert2";
import validarSuscripcion from "../utils/validarSuscripcion";
import categorias from "../data/categorias";

export default function AgregarSuscripcion() {
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

    try {
      const nueva = {
        ...formulario,
        precio: parseFloat(formulario.precio),
        usuarioId: usuario.uid,
        activa: true
      };
      await crearSuscripcion(nueva);
      Swal.fire("Guardado", "Suscripción agregada correctamente", "success");
      navigate("/dashboard");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Nueva Suscripción</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errores.nombre && <p className="text-red-600 text-sm">{errores.nombre}</p>}

        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={formulario.precio}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errores.precio && <p className="text-red-600 text-sm">{errores.precio}</p>}

        <input
          name="moneda"
          type="text"
          placeholder="Moneda (USD, EUR...)"
          value={formulario.moneda}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errores.moneda && <p className="text-red-600 text-sm">{errores.moneda}</p>}

        <select
          name="categoria"
          value={formulario.categoria}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errores.categoria && <p className="text-red-600 text-sm">{errores.categoria}</p>}

        <select
          name="cicloFacturacion"
          value={formulario.cicloFacturacion}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="mensual">Mensual</option>
          <option value="semanal">Semanal</option>
          <option value="anual">Anual</option>
        </select>

        <input
          name="proximaFacturacion"
          type="date"
          value={formulario.proximaFacturacion}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errores.proximaFacturacion && <p className="text-red-600 text-sm">{errores.proximaFacturacion}</p>}

        <textarea
          name="notas"
          placeholder="Notas (opcional)"
          value={formulario.notas}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Guardar
        </button>
      </form>
    </div>
  );
}
