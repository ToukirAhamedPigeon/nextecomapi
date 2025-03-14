import mongoose, { model, Model, Schema } from 'mongoose';
import { TypeCampaignModel } from '@/types/models';

type CampaignModel = Model<TypeCampaignModel>;

const schema = new Schema<TypeCampaignModel, CampaignModel>({
    name: { type: String, required: true },
    title: { type: String },
    subtitle: { type: String },
    textColor: { type: String },
    btn: { type: String },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    product: { type: String },
    slide: { type: String },
    store: { type: String, required: true },
    status: { type: String, enum: ['draft', 'publish', 'archive'], default: 'draft' },
    user_id: { type: String, required: true },
    views: { type: Number, default: null },
    approvedAt: { type: String }
}, { timestamps: true });

const Campaign = mongoose.models.Campaign || model<TypeCampaignModel, CampaignModel>('Campaign', schema);

export default Campaign;
