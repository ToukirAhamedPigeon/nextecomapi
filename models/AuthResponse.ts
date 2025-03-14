import mongoose, { model, Model, Schema } from 'mongoose';
import { TypeAuthResponseModel } from '@/types/models';

type AuthResponseModel = Model<TypeAuthResponseModel>;

const schema = new Schema<TypeAuthResponseModel, AuthResponseModel>({
    message: { type: String },
    status: { 
        type: Number, 
        enum: [401], 
        default: 401 
    }
}, { timestamps: true });

const AuthResponse = mongoose.models.AuthResponse || model<TypeAuthResponseModel, AuthResponseModel>('AuthResponse', schema);

export default AuthResponse;
