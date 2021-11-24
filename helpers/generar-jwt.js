const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
  return new Promise((resp, rej) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          rej("No se pudo generar el JWT");
        } else {
          resp(token);
        }
      }
    );
  });
};

module.exports = generarJWT;
