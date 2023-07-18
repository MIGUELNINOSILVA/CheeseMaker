import { Router } from "express";
import { check } from "express-validator";
import {
    getUsuario,
    obtenerUnUsuario,
    agregarUsuario,
    borrarUsuario,
    actualizarUsuario,
} from "../controllers/usuario.controllers.js";
import { validateDocuments } from "../middlewares/validate.documents.js";
import Role from "../models/Role.js";

const router = Router();

router.get("/", getUsuario);
router.get("/:id", obtenerUnUsuario);
router.post(
    "/add",
    [
        check("nombre", "El nombre es Obligatorio No valido").not().isEmpty(),
        check("password", "Password debe ser minimo de 6 caracteres").isLength({
            min: 6,
        }),
        check("email", "El correo no es válido").isEmail(),
        /* check('role', 'No es un ROL válido').isIn(['ADMIN', 'USER']), */
        check('role').custom(async(role = '')=>{
            const existeRol = await Role.findOne({role});
            if(!existeRol) {
                throw new Error(`El rol ${role} no está registrado en la base de datos`);
            }
        }),
        validateDocuments
    ],
    agregarUsuario
);
router.delete("/delete/:id", borrarUsuario);
router.patch("/upd/:id", actualizarUsuario);

export default router;
