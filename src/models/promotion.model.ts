import mongoose from 'mongoose'
import { PromotionTypes } from "../types"


export interface IPromotion extends mongoose.Document{
    uuid: string
    name: string,
    type: PromotionTypes,
    startDate: Date,
    endDate: Date,
    userGroupName: string
}

const PromotionSchema = new mongoose.Schema({
    uuid: { type: String, required: true, uniq: true },
    name: { type: String, required: true },
    type: { type: String, enum: Object.keys(PromotionTypes), required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    userGroupName: { type: String, required: true },
})

export const PromotionModel = mongoose.model('promotions', PromotionSchema)

