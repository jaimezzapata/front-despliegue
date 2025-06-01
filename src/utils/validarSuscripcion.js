export default function validarSuscripcion(formulario) {
  const errores = {};
  if (!formulario.nombre.trim()) errores.nombre = "El nombre es obligatorio";
  if (!/^\d+(\.\d{1,2})?$/.test(formulario.precio)) errores.precio = "El precio debe ser un número válido";
  if (!formulario.moneda.trim()) errores.moneda = "La moneda es obligatoria";
  if (!formulario.categoria.trim()) errores.categoria = "Seleccione una categoría";
  if (!formulario.proximaFacturacion) errores.proximaFacturacion = "La fecha es obligatoria";
  return errores;
}
