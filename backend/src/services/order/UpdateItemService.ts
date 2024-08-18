import prismaClient from "../../prisma";

interface ItemRequest{
    item_id: string
    order_id: string
    amount: number
}

class UpdateItemService{
    async execute({item_id, order_id, amount}: ItemRequest){

        // const order = await prismaClient.order.findFirst({
        //     where:{
        //         id: order_id,
        //         draft: true
        //     },
        // })

        // if(!order){
        //     throw new Error("Order can't be updated!")
        // }

        // const orderItem = await prismaClient.orderItem.update({
        //     where:{
        //         id: item_id,
        //     },
        //     data:{
        //         amount: amount
        //     },
        //     include: {
        //         order: true
        //     }
        // })

         const orderItem = await prismaClient.orderItem.update({
            where:{
                id: item_id, 
                order: {
                    draft: true
                }
            },
            data:{
                amount: amount,
            },
            include: {
                order: true
            },
        })

        if(!orderItem){
            throw new Error("Order can't be updated!")
        }

        return orderItem

        return orderItem
    }
}

export { UpdateItemService };
