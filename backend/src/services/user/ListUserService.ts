import prismaClient from "../../prisma"

class ListUserService {
    async execute(){

        const user = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            },
             where: {
                deleted_at: null
            }
        })

        return user
    }
}

export { ListUserService }
