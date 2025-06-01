import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../context/AuthContext";
import { obtenerSuscripcionesPorUsuario } from "../api/suscripciones";
import { format, isSameDay, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export default function CalendarioFacturaciones() {
  const { usuario } = useAuth();
  const [suscripciones, setSuscripciones] = useState([]);
  const [seleccionado, setSeleccionado] = useState(new Date());

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerSuscripcionesPorUsuario(usuario.uid);
        setSuscripciones(data);
      } catch (e) {
        console.error("Error al cargar suscripciones:", e);
      }
    };
    if (usuario) cargar();
  }, [usuario]);

  const getTileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const suscripcionesDelDia = suscripciones.filter((sub) =>
      isSameDay(parseISO(sub.proximaFacturacion), date)
    );
    return suscripcionesDelDia.length > 0 ? (
      <div className="mt-1 text-xs text-blue-600 font-medium">
        {suscripcionesDelDia.length} suscripción
        {suscripcionesDelDia.length > 1 ? "es" : ""}
      </div>
    ) : null;
  };

  const suscripcionesDelSeleccionado = suscripciones.filter((sub) =>
    isSameDay(parseISO(sub.proximaFacturacion), seleccionado)
  );

  return (
    <div className="bg-white shadow p-6 rounded max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Calendario de Próximas Facturaciones
      </h2>
      <Calendar
        onChange={setSeleccionado}
        value={seleccionado}
        tileContent={getTileContent}
        locale="es"
      />
      {suscripcionesDelSeleccionado.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Facturaciones del {format(seleccionado, "PPP", { locale: es })}
          </h3>
          <ul className="space-y-2">
            {suscripcionesDelSeleccionado.map((sub) => (
              <li key={sub.id} className="border p-2 rounded">
                <span className="font-semibold">{sub.nombre}</span> — $
                {sub.precio.toFixed(2)} ({sub.categoria})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
