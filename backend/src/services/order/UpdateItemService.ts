import prismaClient from "../../prisma";

interface ItemRequest{
    item_id: string
    order_id: string
    amount: number
}

class UpdateItemService{
    async execute({item_id, order_id, amount}: ItemRequest){

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
