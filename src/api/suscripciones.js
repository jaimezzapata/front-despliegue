import { API_URL } from "./config";

export async function obtenerSuscripcionesPorUsuario(usuarioId) {
  const res = await fetch(`${API_URL}/suscripciones?usuarioId=${usuarioId}`);
  if (!res.ok) throw new Error("Error al obtener suscripciones");
  return res.json();
}

export async function crearSuscripcion(nueva) {
  const res = await fetch(`${API_URL}/suscripciones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nueva),
  });
  if (!res.ok) throw new Error("Error al crear suscripción");
  return res.json();
}

export async function eliminarSuscripcion(id) {
  const res = await fetch(`${API_URL}/suscripciones/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Error al eliminar suscripción");
}

export async function obtenerSuscripcionPorId(id) {
  const res = await fetch(`${API_URL}/suscripciones/${id}`);
  if (!res.ok) throw new Error("No se pudo obtener la suscripción");
  return res.json();
}

export async function actualizarSuscripcion(id, datosActualizados) {
  const res = await fetch(`${API_URL}/suscripciones/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosActualizados)
  });
  if (!res.ok) throw new Error("No se pudo actualizar la suscripción");
  return res.json();
}