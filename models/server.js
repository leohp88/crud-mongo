const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    //Puerto
    this.port = process.env.PORT;
    //Ruta
    this.usuariosPath = "/api/usuarios";
    this.loginPath = "/api/auth";

    //Conectar a la BD
    this.conectarDb();
    //Middlewares
    this.middlewares();
    //Ruta de mi web
    this.router();
  }

  async conectarDb() {
    await dbConection();
  }
  middlewares() {
    //cors
    this.app.use(cors());

    //Parseo y lectura del body
    this.app.use(express.json());

    //Directorio Publico
    this.app.use(express.static("public"));
  }

  router() {
    this.app.use(this.usuariosPath, require("../routers/usuarios"));
    this.app.use(this.loginPath, require("../routers/login"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor inicado en el puerto: ", this.port);
    });
  }
}

module.exports = Server;
