import jwt from 'jsonwebtoken';

export const generarJWT = (uid, role) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, role };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            { expiresIn: '8h' },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                } else {
                    resolve(token);
                }
            }
        );
    });
};