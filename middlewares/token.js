const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarToken = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(404).json({
      msg: "No hay token valido",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVEKEY);

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no valido--usuario no exista en la BD",
      });
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no valido--usuario estado falso",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log("Hubo un error", error);
    res.status(401).json({ msg: "Token no valido" });
  }
};

module.exports = validarToken;
