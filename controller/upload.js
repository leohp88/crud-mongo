const path = require("path");
const { response } = require("express");

const subirArchivo = (req, res = response) => {
  const { archivo } = req.files;
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No hay archivos que subir" });
    return;
  }

  uploadPath = path.join(__dirname, "../uploads/", archivo.name);

  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.send("Archivo subido  " + uploadPath);
  });
};

module.exports = subirArchivo;
