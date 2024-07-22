import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El ID de usuario es obligatorio']
    },
    publicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publications',
        required: [true, 'El ID de la publicación es obligatorio']
    },
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    comentario: {
        type: String,
        required: [true, 'El comentario es obligatorio']
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'La fecha es obligatoria']
    }
});

export default mongoose.model('Comment', CommentSchema);
