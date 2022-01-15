const { Router } = require("express");
const { check } = require("express-validator");
const {
  actualizarImagen,
  subirArchivo,
  mostrarImagen,
} = require("../controller/upload");
const coleccionesPermitidas = require("../helpers/colecciones");
const validarArchivosSubir = require("../middlewares/validar-archivos");
const validarCampos = require("../middlewares/validar-campos");

const router = Router();

router.post("/", validarArchivosSubir, subirArchivo);
router.put(
  "/:coleccion/:id",
  [
    validarArchivosSubir,
    check("id", "El id debe ser de MongoDB").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),

    validarCampos,
  ],
  actualizarImagen
);

router.get("/:coleccion/:id", [
  check("id", "El id debe ser de MongoDB").isMongoId(),
  check("coleccion").custom((c) =>
    coleccionesPermitidas(c, ["usuarios", "productos"])
  ),
  validarCampos,
  mostrarImagen,
]);

module.exports = router;
