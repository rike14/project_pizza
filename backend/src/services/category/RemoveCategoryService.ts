import prismaClient from "../../prisma";

interface ItemRequest{
    category_id: string
}

class RemoveCategoryService{
    async execute({category_id}: ItemRequest){
        
        const findByCategory = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            }
        })

        if(findByCategory.length > 0){
            throw new Error("Category cannot be deleted if there is any product registered")
        }

        const category = await prismaClient.category.delete({
            where:{
                id: category_id,
            }
        })

        return category
    }
}

export { RemoveCategoryService };
