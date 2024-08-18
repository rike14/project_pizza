import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response){
        const { name, price, description, category_id } = req.body

        const createProductService = new CreateProductService()

        if(!req.file){
            throw new Error("Error upload file")
        } else {

            const { filename: banner } = req.file

            const product = await createProductService.execute({
                banner,
                name,
                price,
                description,
                category_id
            })
    
            return res.json(product)
        }

    }
}

export { CreateProductController };
