const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  nombre: { type: String, required: [true, "El nombre es obligatorio"] },
  correo: {
    type: String,
    require: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: { type: String, required: [true, "La contraseña es obligatorio"] },
  img: { type: String },
  rol: { type: String, requerided: true, emun: ["ADMIN_ROLE", "USER_ROLE"] },
  estado: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

usuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuarios } = this.toObject();
  usuarios.uid = _id;
  return usuarios;
};

module.exports = model("Usuario", usuarioSchema);
