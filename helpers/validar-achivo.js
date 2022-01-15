const path = require("path");
const { v4: uuid } = require("uuid");

const cargarArchivo = (
  files,
  extensionValid = ["jpg", "png", "gif", "jpeg"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    //Validar extensiones
    const extensionValidas = extensionValid;

    if (!extensionValidas.includes(extension)) {
      return reject(
        `La extension ${extension} no es valida ${extensionValidas}`
      );
    }

    const nombreTemporal = uuid() + "." + extension;
    uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemporal);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(nombreTemporal);
    });
  });
};

module.exports = {
  cargarArchivo,
};
