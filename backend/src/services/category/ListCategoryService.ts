import prismaClient from "../../prisma"

class ListCategoryService {
    async execute(){

        const category = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
            },
            where: {
                deleted_at: null
            }
        })

        return category
    }
}

export { ListCategoryService }
