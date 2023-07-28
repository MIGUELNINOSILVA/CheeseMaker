import {
    response
} from "express";
import Usuario from "../models/Usuario.js";
import bcryptjs from "bcryptjs";
import {
    generateJWT
} from '../helpers/generate.JWT.js';

const login = async (req, res = response) => {
    try {
        const {
            email,
            password
        } = req.body;
        //Verificar que el correo electronico exista
        const usuario = await Usuario.findOne({
            email
        });
        if (!usuario) {
            return res.status(500).json({
                msg: "El usuario no es correcto."
            });
        }
        //Estado activo
        if (!usuario.estado) {
            return res.status(500).json({
                msg: "El usuario está inactivo."
            });
        }
        const passwordUser = usuario.password;

        // Comparar las contraseñas utilizando bcrypt.compare()
        bcryptjs.compare(password, passwordUser, async (err, result) => {
            if (err) {
                // Ocurrió un error al comparar las contraseñas
                console.error('Error al comparar contraseñas:', err);
                res.status(500).json({
                    msg: "Error al comparar contraseñas"
                });
                return;
            }

            if (result) {
                // La contraseña es válida, generamos el token
                const token = await generateJWT(usuario._id);
                res.json({
                    msg: "Contraseña válida. Acceso permitido.",
                    token: token
                });
            } else {
                // La contraseña es incorrecta
                res.status(401).json({
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