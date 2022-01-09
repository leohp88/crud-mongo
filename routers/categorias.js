const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controller/categorias");
const {
  existeCategoria,
  verificarProducto,
  existeProducto,
} = require("../helpers/db-validators");
const validarToken = require("../middlewares/token");
const validarCampos = require("../middlewares/validar-campos");
const esAdminRole = require("../middlewares/validar-roles");
const router = Router();
//{{url}}/api/categorias

//Obtener todas las categorias
router.get("/", obtenerCategorias);

//Obtener una categorias por id
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  obtenerCategoria
);

//Crear una categoria - privada
router.post(
  "/",
  [
    validarToken,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar - privada
router.put("/:id", [
  validarToken,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("id").custom(existeCategoria),
  validarCampos,
  actualizarCategoria,
]);

//Borrar una categoria - si es Admin
router.delete(
  "/:id",
  [
    validarToken,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
