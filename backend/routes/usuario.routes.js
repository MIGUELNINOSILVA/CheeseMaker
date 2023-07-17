import { Router } from "express";
import { getUsuario } from "../controllers/usuario.controllers.js";

const router = Router();

router.get("/", getUsuario);

export default router;
