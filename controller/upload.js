const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { response } = require("express");
const { cargarArchivo } = require("../helpers/validar-achivo");
const { Usuario, Producto } = require("../models");
const { send } = require("process");

const subirArchivo = async (req, res = response) => {
  const { archivo } = req.files;
  try {
    const pathCompleto = await cargarArchivo(
      req.files,
      ["txt", "md"],
      "textos"
    );
    res.json({ pathCompleto });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un producto con el id ${id}` });
      }
      break;

    default:
      res.status(500).json({ msg: "Se me olvido hacer esto" });
      break;
  }

  //Limpiar imagenes existentes
  if (modelo.img) {
    const pathImage = path.join(__dirname, "../uploads", coleccion, modelo.img);
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  const actualizarCloudinary = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
      case "usuarios":
        modelo = await Usuario.findById(id);
        if (!modelo) {
          return res
            .status(400)
            .json({ msg: `No existe un usuario con el id ${id}` });
        }
        break;

      case "productos":
        modelo = await Producto.findById(id);
        if (!modelo) {
          return res
            .status(400)
            .json({ msg: `No existe un producto con el id ${id}` });
        }
        break;

      default:
        res.status(500).json({ msg: "Se me olvido hacer esto" });
        break;
    }

    if (modelo.img) {
      const nombreArr = modelo.img.split("/");
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split(".");
      cloudinary.uploader.destroy(public_id);
    }

    const { temFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(temFilePath);
    await modelo.save(secure_url);
    modelo.img = secure_url;
    res.json(modelo);
  };
};

const mostrarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;
  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un producto con el id ${id}` });
      }
      break;

    default:
      res.status(500).json({ msg: "Se me olvido hacer esto" });
      break;
  }

  //Limpiar imagenes existentes
  if (modelo.img) {
    const pathImage = path.join(__dirname, "../uploads", coleccion, modelo.img);
    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }
  const pathNoImage = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathNoImage);
};

module.exports = {
  subirArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarCloudinary,
};
