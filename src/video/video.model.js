import mongoose from 'moongose';

const VideoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "El título es obligatorio"],
        unique: true,
    },
    description: {
        type: String,

    },
    url: {
        type: String,
        required: [true, 'La URL es obligatoria']
    },
});

export default mongoose.model('Video', VideoSchema);