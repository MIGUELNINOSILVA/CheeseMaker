import Usuario from "../models/Usuario.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";

const getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.find();
        res.json(usuario);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
};

const obtenerUnUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ _id: req.params.id });
        res.json(usuario);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const agregarUsuario = async (req, res) => {
    
    

    const usuario = new Usuario(req.body);
    const { email } = usuario;
    try {
        /* Verificar si el correo ya existe */
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({ message: "Email is registered already" });
        }

        /* Encriptar nuestra contraseña */
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(usuario.password, salt);
        const nuevoUsuario = await usuario.save();
        res.json(nuevoUsuario);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.send(error.message);
    }
};

const borrarUsuario = async (req, res) => {
    try {
        await Usuario.deleteOne({ _id: req.params.id });
        res.status(200).send({
            response: "Eliminado correctamente.",
        });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        let updateUsuario = await Usuario.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.json(updateUsuario);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export {
    getUsuario,
    obtenerUnUsuario,
    agregarUsuario,
    borrarUsuario,
    actualizarUsuario,
};
