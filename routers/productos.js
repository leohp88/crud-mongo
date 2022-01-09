const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerProducto,
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controller/productos");
const { existeProductoID } = require("../helpers/db-validators");
const validarToken = require("../middlewares/token");
const validarCampos = require("../middlewares/validar-campos");
const esAdminRole = require("../middlewares/validar-roles");
const router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoID),
    validarCampos,
  ],
  obtenerProducto
);

router.post(
  "/",
  [
    validarToken,
    check("nombre", "Debe poner un nombre").not().isEmpty(),
    check("descripcion", "Debe agregar una descripcion").not().isEmpty(),
    validarCampos,
  ],
  crearProducto
);

//Actualizar - privada
router.put("/:id", [
  validarToken,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("id").custom(existeProductoID),
  validarCampos,
  actualizarProducto,
]);

//Borrar una categoria - si es Admin
router.delete(
  "/:id",
  [
    validarToken,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoID),
    validarCampos,
  ],
  eliminarProducto
);

module.exports = router;
