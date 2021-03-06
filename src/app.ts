import express, {Request} from 'express'
import { config } from "dotenv"
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import PromotionRouter from './routes/promotion.route'
import {IPromotion, PromotionModel} from "./models/promotion.model";
import {generateFakePromotions, generateUuid} from './services/faker'

export class App {

    static async initDb(){
        return new Promise((resolve, reject) => {
            mongoose.connect(`${process.env.MONGODB_URI}`, {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
            }).catch(() => { /* catch handled in once('error') */ })

            mongoose.connection.once('error', (err) => { reject(err) })
            mongoose.connection.once('open', resolve)
        })
    }

    static async initWebServer(){
        const app = express()
        const PORT = process.env.PORT || "8000"
        app.use(bodyParser.json())
        app.use(cors())
        app.use(bodyParser.urlencoded({ extended: true }))

        app.use('/promotion', PromotionRouter)


        app.listen(PORT, () => console.log(`app listening on port ${PORT}`))


    }

    static async start(){
        config()

        await this.initDb()
        await this.initWebServer()
    }
}
