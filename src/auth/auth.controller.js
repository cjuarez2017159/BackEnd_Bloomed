import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import Admin from '../admin/admin.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si es un usuario
        const user = await User.findOne({ username });

        if (user) {
            if (!user.status) {
                return res.status(401).json({ msg: 'Usuario desactivado' });
            }

            const validPassword = await bcryptjs.compare(password, user.password);
            if (validPassword) {
                const birthDate = new Date(user.fechaNacimiento);
                const age = calculateAge(birthDate);

                if (age >= 10) {
                    const token = await generarJWT(user.id, 'user');
                    return res.status(200).json({
                        msg: "Bienvenido",
                        userDetails: {
                            username: user.username,
                            token,
                            role: "user"
                        },
                    });
                } else {
                    return res.status(400).json({ msg: "Eres menor de edad, necesitas la ayuda de un adulto para iniciar sesión." });
                }
            } else {
                return res.status(400).json({ msg: "Contraseña incorrecta" });
            }
        }

        // Verificar si es un administrador
        const admin = await Admin.findOne({ username });

        if (admin) {
            if (!admin.status) {
                return res.status(401).json({ msg: 'Administrador desactivado' });
            }

            const validPassword = await bcryptjs.compare(password, admin.password);
            if (validPassword) {
                const token = await generarJWT(admin.id, 'admin');
                return res.status(200).json({
                    msg: "Login OK!!!",
                    userDetails: {
                        username: admin.username,
                        token,
                        role: "admin"
                    },
                });
            } else {
                return res.status(400).json({ msg: "Contraseña incorrecta" });
            }
        }

        return res.status(400).json({ msg: `Credenciales incorrectas, ${username} no existe en la base de datos` });

    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Comuníquese con el administrador" });
    }
};

const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
