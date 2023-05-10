import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
    {
        legalNumber: {
            type: String,
            unique: true
        },
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model('Companies', CompanySchema)