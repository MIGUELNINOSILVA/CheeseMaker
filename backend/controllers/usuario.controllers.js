import Usuario from "../models/Usuario.js";

const getUsuario = async(req, res) => {
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
    try {
        const nuevoUsuario = await usuario.save();
        res.json(nuevoUsuario);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const borrarUsuario = async (req, res) => {
    try {
        await 
        Usuario.deleteOne({ _id: req.params.id });
        res.status(200).send({
            response: "Eliminado correctamente."
        });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        let updateUsuario = await Usuario.findOneAndUpdate({ _id: req.params.id },
            req.body,
            { new: true });
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
    actualizarUsuario
}
