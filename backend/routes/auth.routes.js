import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.controllers.js";
import { validateDocuments } from "../middlewares/validate.documents.js";

const router = Router();

router.post('/',[
    check("email", "Email es obligatorio").isEmail(),
    check("password", "Password es obligatorio").not().isEmpty(),
    validateDocuments
], login);

export default router;