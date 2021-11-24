const { response, request } = require("express");

const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);
  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res) => {
  const { nombre, password, rol, correo } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  //Encriptar password
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);
  await usuario.save();

  res.status(201).json({
    usuario,
  });
};

const usuariosPut = async (req = request, res) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    //Encriptar password
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.status(500).json({
    usuario,
  });
  if (res.status === 404) {
    res.send("No existe la ruta");
  }
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  //Borrar Fisicamente
  //const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  const usuarioAutenticado = req.usuario;
  res.json({ usuario, usuarioAutenticado });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API",
  });
};
module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
};
