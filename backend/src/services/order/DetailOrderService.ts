import prismaClient from "../../prisma";

interface DetailRequest{
    order_id: string
}
class DetailOrderService{
    async execute({ order_id }: DetailRequest){
        
        const order_items = await prismaClient.orderItem.findMany({
            where:{
                order_id: order_id,
            },
            include:{
                product: true,
                order: true
            }
        })

        return order_items;
    }
}

export { DetailOrderService };
