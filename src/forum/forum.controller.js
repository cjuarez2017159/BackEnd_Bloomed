import { response, request } from "express";
import jwt from "jsonwebtoken";
import Forum from '../forum/forum.model.js'
import User from '../user/user.model.js'

export const forumGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = {};

    try {
    
        const [total, forums] = await Promise.all([
            Forum.countDocuments(query),
            Forum.find(query)
                .skip(Number(desde) || 0)
                .limit(Number(limite) || 10)
        ]);

        res.status(200).json({

            total,
            forums
        
        });
 
    } 
    catch (e) {
        console.error('Error fetching forums:', e);
        res.status(500).json({ msg: 'Error fetching forums' });
    }
}



export const forumPost = async (req, res) => {
    
    const { tituloForo, contenido} = req.body;
    const foro = Forum ({tituloForo, contenido});
    const token = req.header('x-token');

    try {

        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const userId = decoded.uid;

        const user = await User.findById(userId);

        if (!user) {

            return res.status(401).json({ msg: 'Usuario no autorizado' });

        }
    }

    catch (error) {
    res.status(401).json({ msg: 'Token no válido' });
}

    await foro.save();

    res.status(200).json({
        foro
    })

}