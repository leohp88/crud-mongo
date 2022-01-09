const { Categoria, Producto } = require("../models");
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

const existeCategoria = async (id) => {
  const existCategoria = await Categoria.findById(id);
  if (!existCategoria) {
    throw new Error(`No existe la categoria`);
  }
};

const existeProductoID = async (id) => {
  const validproducto = await Producto.findById(id);
  if (!validproducto) {
    throw new Error(`No existe el producto ${id}`);
  }
};

module.exports = {
  esRolValido,
  esEmailValido,
  existeUsuarioPorId,
  existeCategoria,
  existeProductoID,
};
