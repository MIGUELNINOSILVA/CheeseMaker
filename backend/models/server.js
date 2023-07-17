import express from "express";
import cors from "cors";
import usuarioRouter from "../routes/usuario.routes.js";

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = "/api/usuarios";
        //MiddleWares
        this.middlewares();
        //Routing
        this.routes();
    }

    middlewares(){
        /* Public direction */
        this.app.use(express.static('public'));
        //Cors
        this.app.use(cors());
        //Express json
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server runing on port ${this.port}`);
        });
    }

    routes(){
        this.app.use(this.usuarioPath, usuarioRouter);
    }
}

export default Server;