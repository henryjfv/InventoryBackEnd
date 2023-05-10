import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
        },
        role: {
            type: ["external", "admin"],
            default: 'external'
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model('Users', UserSchema)