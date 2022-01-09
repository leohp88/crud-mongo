const { request } = require("express");
const { Producto } = require("../models");

const existeProducto = async (req = request, res, next) => {
  const nombre = req.body;
  try {
    const producto = await Producto.findOne({ nombre });
    if (producto) {
      res.status(400).json({ msg: `El Producto ${producto.nombre} ya existe` });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = existeProducto;
