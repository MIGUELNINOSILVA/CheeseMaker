import { Router } from "express";
import { getUsuario, obtenerUnUsuario, agregarUsuario, borrarUsuario, actualizarUsuario } from "../controllers/usuario.controllers.js";

const router = Router();

router.get("/", getUsuario);
router.get("/:id", obtenerUnUsuario);
router.post("/add", agregarUsuario);
router.delete("/delete/:id", borrarUsuario);
router.patch("/upd/:id", actualizarUsuario);

export default router;
