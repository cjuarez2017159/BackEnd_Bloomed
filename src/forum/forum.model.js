import { Schema, model } from 'mongoose';

const ForoSchema = new Schema({
    idcomment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    },
    question: {
        type: String,
        required: [true, 'La pregunta es obligatoria']
    }
});

export default model('Foro', ForoSchema);
