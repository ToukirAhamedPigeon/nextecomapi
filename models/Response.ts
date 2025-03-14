import mongoose, { model, Model, Schema } from 'mongoose';
import { TypeResponseModel } from '@/types/models';

type ResponseModel = Model<TypeResponseModel>;
const ResponseSchema = new Schema<TypeResponseModel, ResponseModel>({
    message: { type: String },
    status: { 
        type: Number, 
        default: 200 
    },
    success: { 
        type: Boolean, 
        default: true 
    },
    data: [{ type: {} }]
}, { timestamps: true });

const Response = mongoose.models.Response || model<TypeResponseModel, ResponseModel>('Response', ResponseSchema);
export default Response;
