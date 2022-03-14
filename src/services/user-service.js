const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const fetchUser = async () =>{
    return await prisma.user.findMany({
        include :   {
            cadastre : {
                include :{
                    image : true
                }
            }
            
        }
    })
}


module.exports = {
    fetchUser
}