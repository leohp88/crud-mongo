const dbValidators = require("./db-validators");
const generarJwt = require("./generar-jwt");
const validarArchivos = require("./validar-achivo");
const colecciones = require("./colecciones");

module.exports = {
  ...dbValidators,
  ...generarJwt,
  ...validarArchivos,
  ...colecciones,
};
