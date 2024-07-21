import jwt from 'jsonwebtoken'

export const generarJWT = (uid) => {
    return new Promise ((resolve, reject) =>{
        const payload = {uid}
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '8h'
            },
            (err, token)=>{
                err ? (console.log(err),reject('we have a problem to generate the token')) : resolve(token)
            }
        )
    })
}