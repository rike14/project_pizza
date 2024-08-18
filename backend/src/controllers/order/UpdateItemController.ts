import { Request, Response } from "express";
import { UpdateItemService } from "../../services/order/UpdateItemService";

class UpdateItemController{
    async handle(req: Request, res: Response){
        const { item_id, order_id, amount } = req.body

        const updateItemService = new UpdateItemService()

        const order = await updateItemService.execute({
            item_id,
            order_id,
            amount
        })

        return res.json(order)
    }
}

export { UpdateItemController };
