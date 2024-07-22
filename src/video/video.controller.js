import { response, request } from 'express';
import Video from './video.model.js';

export const getVideos = async (req = request, res = response) => {
    const { limite = 10, desde = 0 } = req.query;

    try {
        const [total, videos] = await Promise.all([
            Video.countDocuments(),
            Video.find()
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            videos
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los videos' });
    }
}

export const getVideoById = async (req, res = response) => {
    const { id } = req.params;

    try {
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ msg: 'Video no encontrado' });
        }
        res.status(200).json({ video });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener el video' });
    }
}

export const createVideo = async (req, res = response) => {
    const { title, description, url } = req.body;
    const video = new Video({ title, description, url });

    try {
        await video.save();
        res.status(201).json({ video });
    } catch (error) {
        res.status(400).json({ msg: 'Error al crear el video', error });
    }
}

export const updateVideo = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    try {
        const video = await Video.findByIdAndUpdate(id, resto, { new: true });
        if (!video) {
            return res.status(404).json({ msg: 'Video no encontrado' });
        }
        res.status(200).json({ video });
    } catch (error) {
        res.status(400).json({ msg: 'Error al actualizar el video', error });
    }
}

export const deleteVideo = async (req, res = response) => {
    const { id } = req.params;

    try {
        const video = await Video.findByIdAndDelete(id);
        if (!video) {
            return res.status(404).json({ msg: 'Video no encontrado' });
        }
        res.status(200).json({ msg: 'Video eliminado' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el video' });
    }
}
