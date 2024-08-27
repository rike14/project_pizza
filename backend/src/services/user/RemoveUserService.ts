import prismaClient from "../../prisma";

interface ItemRequest{
    user_id: string
}

class RemoveUserService{
    async execute({user_id}: ItemRequest){
        
        const findByUser = await prismaClient.user.findMany()

        if(findByUser.length == 1){
            throw new Error("User cannot be deleted")
        }

        const user = await prismaClient.user.delete({
            where:{
                id: user_id,
            }
        })

        return user
    }
}

export { RemoveUserService };
