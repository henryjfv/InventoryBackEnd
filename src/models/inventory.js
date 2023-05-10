import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema(
    {
        product: {
            type: String,
        },
        total: {
            type: Number,
        },
        companyId: {
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model('Inventories', InventorySchema)