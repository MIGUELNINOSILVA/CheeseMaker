import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String
    },
    role:{
        type: String,
        required: true,
        default: 'USER',
        enum: ['ADMIN', 'USER']
    },
    estado: {
        type: Boolean,
        default: true
    },
    googleSignIn: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;