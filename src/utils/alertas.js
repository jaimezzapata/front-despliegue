import Swal from "sweetalert2";

// Alerta de éxito
export const alertaExito = (titulo = "Éxito", mensaje = "Operación realizada correctamente") =>
  Swal.fire(titulo, mensaje, "success");

// Alerta de error
export const alertaError = (mensaje = "Ocurrió un error") =>
  Swal.fire("Error", mensaje, "error");

// Alerta de confirmación (retorna promesa con result)
export const alertaConfirmacion = async ({
  titulo = "¿Estás seguro?",
  texto = "Esta acción no se puede deshacer",
  confirmacion = "Sí, eliminar",
  cancelacion = "Cancelar"
} = {}) => {
  return Swal.fire({
    title: titulo,
    text: texto,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: confirmacion,
    cancelButtonText: cancelacion
  });
};
