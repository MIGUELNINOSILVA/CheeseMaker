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

export {
    getUsuario
}
