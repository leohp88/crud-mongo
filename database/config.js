const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);

    console.log("Base de Datos Online");
  } catch (err) {
    console.log(err);
    throw new Error("Error al levantar la BD");
  }
};

module.exports = { dbConection };
