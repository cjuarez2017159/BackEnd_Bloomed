import jwt from 'jsonwebtoken';
import Admin from '../admin/admin.model.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }

    try {
        const { uid, role } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        if (role === 'admin') {
            const admin = await Admin.findById(uid);
            if (!admin || !admin.status) {
                return res.status(401).json({ msg: 'Token no válido - administrador desactivado o no existe' });
            }
            req.user = admin;
            req.user.role = 'admin';
        } else {
            return res.status(401).json({ msg: 'Token no válido - rol desconocido' });
        }

        next();
    } catch (error) {
        console.error('Error en validarJWT:', error);
        res.status(401).json({ msg: 'Token no válido' });
    }
};
