import prismaClient from "../../prisma";

interface ItemRequest{
    product_id: string
}

class RemoveProductService{
    async execute({product_id}: ItemRequest){
        
        const findByOrderItem = await prismaClient.orderItem.findMany({
            where: {
                product_id: product_id,
                order: {
                    status: false
                }
            },
            include: {
                order: true
            }
        })

        
        if(findByOrderItem.length > 0){
            throw new Error("Product cannot be deleted if there is any order open with it")
        }
        
        const product = await prismaClient.product.update({
            where:{
                id: product_id, 
            },
            data:{
                deleted_at: new Date()
            }
        })

        return product
    }
}

export { RemoveProductService };
