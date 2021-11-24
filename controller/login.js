const { response } = require("express");
const bcryptjs = require("bcrypt");
const Usuario = require("../models/usuario");
const generarJWT = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res
        .status(404)
        .json({ msg: "Usuario / Password no son correctos ---pasword" });
    }

    const token = await generarJWT(usuario.id);
    res.json({
      usuario,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};

module.exports = login;
