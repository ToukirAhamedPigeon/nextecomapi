import mongoose, { model, Model, Schema } from 'mongoose';
import { TypeDeleteResponseModel } from '@/types/models';

type DeleteResponseModel = Model<TypeDeleteResponseModel>;

const schema = new Schema<TypeDeleteResponseModel, DeleteResponseModel>({
    message: { type: String },
    status: { 
      type: Number, 
      default: 204 
    },
    success: { 
      type: Boolean, 
      default: true 
    }
}, { timestamps: true });

const DeleteResponse = mongoose.models.DeleteResponse || model<TypeDeleteResponseModel, DeleteResponseModel>('DeleteResponse', schema);

export default DeleteResponse;
