import prismaClient from "../../prisma"

class ListProductsService {
    async execute(){

        const product = await prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                banner: true,
                description: true,
                category: {
                    select: {
                        name: true
                    }
                }
            }

        })

        return product
    }
}

export { ListProductsService }
