import prismaClient from "../../prisma"

interface ProductRequest{
    banner: string
    name: string
    price: string
    description: string
    category_id: string
}

class CreateProductService {
    async execute({banner, name, price, description, category_id}: ProductRequest){
        
        const product = await prismaClient.product.create({
            data:{
                banner: banner,
                name: name,
                price: price,
                description: description,
                category_id: category_id,
            }
        })

        return product
    }
}

export { CreateProductService }

