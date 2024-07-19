import { validationResult } from "express-validator";
import User from '../user/user.model.js';

export const existenteUsername = async (username = '') => {
    const existeUsername = await User.findOne({ username });
    if (existeUsername) {
        throw new Error(`El nombre de usuario ${username} ya fue registrado`);
    }
}

export const existenteEmail = async (email = '') => {
    const existeEmail = await User.findOne({email});
    if (existeEmail){
        throw new Error(`El email ${email} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario){
        throw new Error(`El ID: ${email} No existe`);
    }
}