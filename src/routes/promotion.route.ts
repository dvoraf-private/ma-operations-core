import { Router } from 'express'
import {
    createPromotion,
    deletePromotion,
    generateFakeData,
    getAllPromotions,
    updatePromotion,
    deleteMany
} from "../controllers/promotion.controller";

const router = Router()

router.post('/generateFakeData', generateFakeData)

router.get('/getAll', getAllPromotions)

router.delete('/delete/:id', deletePromotion)

router.delete('/deletePromotions', deleteMany)

router.patch('/update/:id', updatePromotion)

router.post('/add', createPromotion )

export default router
