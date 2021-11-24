const { Router } = require("express");
const { check } = require("express-validator");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require("../controller/usuarios");
const {
  esRolValido,
  esEmailValido,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
const validarToken = require("../middlewares/token");
const validarCampos = require("../middlewares/validar-campos");
const esAdminRole = require("../middlewares/validar-roles");
const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
  ],

  validarCampos,
  usuariosPut
);

router.put("/:id", usuariosPut);

router.post(
  "/",
  [
    check("nombre", "El nombres es obligatorio").not().isEmpty(),
    check("password", "El password tiene que ser de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "Correo no valido").isEmail(),
    check("correo").custom(esEmailValido),
    //check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRolValido),
    validarCampos,
  ],

  usuariosPost
);

router.delete(
  "/:id",
  [
    validarToken,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;
