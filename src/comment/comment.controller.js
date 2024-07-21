import { response, request } from "express";
import Comment from "./comment.model.js";
import Publications from "../publications/publications.model.js";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const postcomment = async (req, res = response) => {
    const { comentario, publicationId } = req.body;
    const token = req.header('x-token');

    try {
        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const userId = decoded.uid;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }

        const comment = new Comment({
            username: user.username,
            comentario: comentario,
            date: new Date()
        });

        await comment.save();

        const publication = await Publications.findById(publicationId);
        if (!publication) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        publication.idComment = comment._id;
        await publication.save();

        res.status(201).json({
            msg: 'Comentario agregado exitosamente',
            comment
        });
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
}

export const getComments = async (req, res = response) => {
    try {
        const comments = await Comment.find();
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los comentarios' });
    }
}

export const getCommentById = async (req, res = response) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }
        res.status(200).json({ comment });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener el comentario' });
    }
}

export const updateComment = async (req, res = response) => {
    const { id } = req.params;
    const { comentario, ...resto } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(id, { comentario, ...resto }, { new: true });
        if (!updatedComment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }

        res.status(200).json({
            msg: 'Comentario actualizado',
            updatedComment
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el comentario' });
    }
}

export const deleteComment = async (req, res = response) => {
    const { id } = req.params;

    try {
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }

        res.status(200).json({
            msg: 'Comentario eliminado',
            deletedComment
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el comentario' });
    }
}
