import { Request, Response } from 'express'
import { generateUuid } from "../services/faker"
import { PromotionModel } from "../models/promotion.model"
import { IRequestQueryProps } from '../types'
import { generateFakePromotions } from "../services/faker"

export const generateFakeData = async (req: Request, res: Response) => {
    try {
        const amount = process.env.GENERATE_DATA_AMOUNT || 0
        await generateFakePromotions(parseInt(amount || '0'))
        res.send({amount: amount})
    }
    catch (e) {
        console.error(`generateFakeData failed, err: ${e.message}`)
        res.status(500)
    }
}

export const createPromotion = async (req: Request, res: Response) => {
    try {
        let {uuid, ...data } = req.body

        uuid = generateUuid()
        const created = await PromotionModel.create({uuid, ...data})
        res.send({uuid: uuid})
    }
    catch (e) {
        console.error(`createPromotion failed, err: ${e.message}`)
        res.status(500)
    }
}


export const updatePromotion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const updated = await PromotionModel.updateOne({uuid: id}, {...req.body})
        res.send({})
    }
    catch (e) {
        console.error(`updatePromotion failed, err: ${e.message}`)
        res.status(500)
    }
}

export const deletePromotion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const deleted = await PromotionModel.deleteOne({uuid: id})
        res.send({})
    }
    catch (e) {
        console.error(`deletePromotion failed, err: ${e.message}`)
        res.status(500)
    }
}


export const getAllPromotions = async (req: Request<{}, {}, IRequestQueryProps>, res: Response) => {
    try {
        const { page, limit } = req.query
        const limitNum =  parseInt(<string>limit)

        const skip =  parseInt(<string>page )

        // @ts-ignore
        const rows = await PromotionModel.find({}).skip(skip).limit(limitNum).select('-_id -__v')

        res.send({
            promotions: rows
        })
    }
    catch (e) {
        console.error(`getAllPromotions failed, err: ${e.message}`)
        res.status(500)
    }
}

export const deleteMany = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body
        const deleted = await PromotionModel.deleteMany({uuid: {$in: ids}})
        res.send({})
    }
    catch (e) {
        console.error(`getAllPromotions failed, err: ${e.message}`)
        res.status(500)
    }
}

