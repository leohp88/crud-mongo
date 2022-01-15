const token = require("./token");
const validarArchivos = require("./validar-archivos");
const validarCampos = require("./validar-campos");
const validarProducto = require("./validar-producto");
const validarRoles = require("./validar-roles");

module.exports = {
  ...token,
  ...validarArchivos,
  ...validarCampos,
  ...validarProducto,
  ...validarRoles,
};
