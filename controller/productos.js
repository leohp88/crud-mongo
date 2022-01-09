const { response } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async (req, res = response) => {
  const { desde = 0, limite = 5 } = req.query;
  const query = { estado: true };
  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .skip(Number(desde))
      .limit(limite)
      .populate("categoria", "nombre")
      .populate("usuario", "nombre"),
  ]);

  res.json({
    total,
    productos,
  });
};

const obtenerProducto = async (req, res = response) => {
  const id = req.params.id;
  try {
    const query = { estado: true };
    const [total, producto] = await Promise.all([
      Producto.countDocuments(query),
      Producto.findById(id).populate("categoria", "nombre"),
    ]);
    res.json({
      total,
      producto,
    });
  } catch (error) {
    console.log(error);
  }
};

const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const productoDB = await Producto.findOne({ nombre: body.nombre });

  if (productoDB) {
    return res
      .status(400)
      .json({ msg: `El producto ${productoDB.nombre} existe en la BD` });
  }

  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };
  const producto = await new Producto(data);
  await producto.save();
  res.status(201).json(producto);
};

const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
  res.json(producto);
};

const eliminarProducto = async (req, res = response) => {
  const { id } = req.params;
  const productoBorrada = await Producto.findByIdAndUpdate(
    id,
    {
      estado: false,
    },
    { new: true }
  );
  res.json(productoBorrada);
};

module.exports = {
  obtenerProducto,
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
