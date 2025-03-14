import mongoose, { model, Model, Schema } from 'mongoose';
import { TypePostResponseModel } from '@/types/models';

type PostResponseModel = Model<TypePostResponseModel>;

const schema = new Schema<TypePostResponseModel, PostResponseModel>({
    message: { type: String },
    status: { 
        type: Number, 
        default: 200 
    },
    success: { 
        type: Boolean, 
        default: true 
    },
    data: { type: {} }
}, { timestamps: true });

const PostResponse = mongoose.models.PostResponse || model<TypePostResponseModel, PostResponseModel>('PostResponse', schema);

export default PostResponse;
