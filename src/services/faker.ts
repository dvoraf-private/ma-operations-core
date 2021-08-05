import * as faker from 'faker'
import _ from 'lodash'
import { IPromotion, PromotionModel } from "../models/promotion.model";
import { PromotionTypes } from "../types";


export const generateFakePromotions = async (count: number): Promise<any> =>
{
    let data: IPromotion[] = []

    await _.times(count, (i: number) => {
        // @ts-ignore
        data.push({
            uuid: faker.datatype.uuid(),
            name: faker.company.companyName(),
            type: !(i%10) ? PromotionTypes.Epic : (i%2 ? PromotionTypes.Common : PromotionTypes.Basic),
            startDate: faker.date.past(),
            endDate: faker.date.future(),
            userGroupName: faker.fake("user-group-{{datatype.number}}")
        })
    })

    await PromotionModel.insertMany(data)
    return true
}


export const generateUuid = (): string => {
    return faker.datatype.uuid()
}


