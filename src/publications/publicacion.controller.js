import { response, request } from "express";
import Publications from "./publications.model.js";
import User from "../user/user.model.js";
import Admin from "../admin/admin.model.js";
import jwt from "jsonwebtoken";

export const publicationsGet = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const token = req.header('x-token');

    try {
        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const userId = decoded.uid;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }

        const userAge = user.edad;
        const query = {
            $or: [
                { edad: { $exists: false } },
                { edad: { $lte: userAge } }
            ]
        };

        const [total, publications] = await Promise.all([
            Publications.countDocuments(query),
            Publications.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            publications
        });
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
}

export const publicationsPost = async (req, res) => {
    const { namePublication, author, date, edad, idComment } = req.body;
    const publication = new Publications({ namePublication, author, date, edad, idComment });

    const token = req.header('x-token');

    try {
        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const adminId = decoded.uid;

        const admin = await Admin.findById(adminId);

        if (!admin || !admin.estado) {
            return res.status(401).json({
                msg: 'No tienes permisos para realizar esta acción'
            });
        }

        if (edad !== '+18' && edad !== '-18') {
            return res.status(400).json({ msg: 'La edad debe ser +18 o -18' });
        }

        await publication.save();

        res.status(200).json({
            publication
        });
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
}

export const getPublicationById = async (req, res) => {
    const { id } = req.params;

    try {
        const publication = await Publications.findById(id);
        if (!publication) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }
        res.status(200).json({ publication });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener la publicación' });
    }
}

export const publicationsPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    try {
        await Publications.findByIdAndUpdate(id, resto);
        const publication = await Publications.findById(id);

        res.status(200).json({
            msg: 'Publicación actualizada',
            publication
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar la publicación' });
    }
}
