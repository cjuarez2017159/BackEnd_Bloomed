import mongoose, { Schema } from 'mongoose';

const RespuestaSchema = new Schema({
    contenido: {
        type: String,
        required: [true, 'El contenido de la respuesta es obligatorio']
    },
    foro: {
        type: Schema.Types.ObjectId,
        ref: 'Foro',
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Respuesta', RespuestaSchema);
