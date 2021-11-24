const Role = require("../models/role");
const Usuario = require("../models/usuario");
const esRolValido = async (rol = "") => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const esEmailValido = async (correo = "") => {
  const existEmail = await Usuario.findOne({ correo });
  if (existEmail) {
    throw new Error(`El correo ${correo} está registrado en la BD`);
  }
};

const existeUsuarioPorId = async (id) => {
  const exisUsuario = await Usuario.findById(id);
  if (!exisUsuario) {
    throw new Error(`El id  ${id} no existe`);
  }
};

module.exports = {
  esRolValido,
  esEmailValido,
  existeUsuarioPorId,
};
