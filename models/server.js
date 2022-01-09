const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    //Puerto
    this.port = process.env.PORT;
    //Ruta
    this.path = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      usuarios: "/api/usuarios",
      categorias: "/api/categorias",
      productos: "/api/productos",
      uploads: "/api/upload",
    };

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
    //Carga de Archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  router() {
    this.app.use(this.path.usuarios, require("../routers/usuarios"));
    this.app.use(this.path.auth, require("../routers/login"));
    this.app.use(this.path.buscar, require("../routers/buscar"));
    this.app.use(this.path.categorias, require("../routers/categorias"));
    this.app.use(this.path.productos, require("../routers/productos"));
    this.app.use(this.path.uploads, require("../routers/uploads"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor inicado en el puerto: ", this.port);
    });
  }
}

module.exports = Server;
