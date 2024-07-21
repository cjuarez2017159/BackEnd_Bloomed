import { response, request } from "express";
import jwt from "jsonwebtoken";
import Respuesta from '../respuesta/respuesta.model.js';
import Foro from '../forum/forum.model.js';
import User from '../user/user.model.js';

export const respuestaPost = async (req, res) => {
    const { contenido } = req.body;
    const { foroId } = req.params;
    const token = req.header('x-token');

    try {
        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const userId = decoded.uid;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }

        const foro = await Foro.findById(foroId);
        if (!foro) {
            return res.status(404).json({ msg: 'Foro no encontrado' });
        }

        const respuesta = new Respuesta({
            contenido,
            foro: foroId,
        });

        await respuesta.save();

        res.status(200).json({
            msg: 'Respuesta creada exitosamente',
            respuesta,
            foro 
        });

    } catch (error) {
        console.error('Error creando respuesta:', error);
        res.status(500).json({ msg: 'Error creando respuesta' });
    }
};
