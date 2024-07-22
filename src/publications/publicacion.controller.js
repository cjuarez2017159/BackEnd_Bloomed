import { response, request } from "express";
import Publications from "./publications.model.js";
import Admin from "../admin/admin.model.js";
import jwt from "jsonwebtoken";

const verificarAdmin = async (token) => {
    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const adminId = decoded.uid;
    const admin = await Admin.findById(adminId);

    if (!admin || !admin.status) {
        throw new Error('No tienes permisos para realizar esta acción');
    }

    return admin;
};

export const publicationsGet = async (req = request, res = response) => {
    const { limite = 10, desde = 0 } = req.query;

    try {
        const [total, publicacion] = await Promise.all([
            Publications.countDocuments(),
            Publications.find()
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            publicacion
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener las publicaciones' });
    }
}


export const publicationsPost = async (req, res) => {
    const { namePublication, author, descripcion, date, edad } = req.body;
    const publication = new Publications({ namePublication, author,descripcion, date, edad });

    const token = req.header('x-token');

    try {
        const admin = await verificarAdmin(token);

        if (edad !== '+18' && edad !== '-18') {
            return res.status(400).json({ msg: 'La edad debe ser +18 o -18' });
        }

        await publication.save();

        res.status(200).json({
            publication
        });
    } catch (error) {
        res.status(401).json({ msg: error.message });
    }
};

export const getPublicationById = async (req, res) => {
    const token = req.header('x-token');
    const { id } = req.params;

    try {
        const admin = await verificarAdmin(token);

        const publication = await Publications.findById(id);
        if (!publication) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }
        res.status(200).json({ publication });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener la publicación' });
    }
};

export const publicationsPut = async (req, res = response) => {
    const token = req.header('x-token');
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    console.log('Token recibido:', token);
    console.log('ID de la publicación:', id);
    console.log('Datos para actualizar:', resto);

    try {
        const admin = await verificarAdmin(token);
        console.log('Admin verificado:', admin);

        const publication = await Publications.findByIdAndUpdate(id, resto, { new: true });
        if (!publication) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        res.status(200).json({
            msg: 'Publicación actualizada',
            publication
        });
    } catch (error) {
        console.error('Error en publicationsPut:', error);
        res.status(500).json({ msg: 'Error al actualizar la publicación' });
    }
};