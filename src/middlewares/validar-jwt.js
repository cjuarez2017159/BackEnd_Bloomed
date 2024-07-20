import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.PRIVATE_SECRET_KEY);// Verifica el token utilizando el secreto JWT  
        const user = await User.findById(uid);// Busca el usuario en la base de datos por el UID
        if (!user) {// Verifica que el usuario exista
            return res.status(401).json({
                msg: 'Token no válido - usuario no encontrado'
            });
        }
        if (!user.status) {                // Verifica que el usuario esté activo
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado:false'
            });
        }

        // Adjunta el usuario a la solicitud
        req.usuario = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};
