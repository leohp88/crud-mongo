const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);

  if (!incluida) {
    throw new Error(
      `La coleccion ${coleccion} no esta permitida ${colecciones}`
    );
  }
  return true;
};

module.exports = coleccionesPermitidas;
