import {
    response
} from "express";
import Usuario from "../models/Usuario.js";
import bcryptjs from "bcryptjs";

const login = async (req, res = response) => {
    try {
        const {
            email,
            password
        } = req.body;

        const usuario = await Usuario.findOne({
            email
        });
        if (!usuario) {
            return res.status(500).json({
                msg: "El usuario no es correcto."
            });
        }
        if (!usuario.estado) {
            return res.status(500).json({
                msg: "El usuario está inactivo."
            });
        }
        const passwordUser = usuario.password;
        // Comparar las contraseñas utilizando bcrypt.compare()
        bcryptjs.compare(password, passwordUser, (err, result) => {
            if (err) {
                // Ocurrió un error al comparar las contraseñas
                console.error('Error al comparar contraseñas:', err);
                return;
            }

            if (result) {
                // La contraseña es válida
                res.json({
                    msg: "Contraseña válida. Acceso permitido."
                });
            } else {
                // La contraseña es incorrecta
                res.json({
                    msg: "Contraseña incorrecta. Acceso denegado"
                });
            }
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

export {
    login
};