const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const xmp = require('exifr')

const insertImg = async (filePath) =>{
    let data = await xmp.parse(filePath, {xmp: true})
    console.log(data)

    await prisma.user.create({
        data : {
            date : 123,
            cadastre : {
                create : {
                    url : 'google.com',
                    image : {
                        create : {
                            pathImg: filePath
                        }
                    }    
                },
                
            },
            
        }
    })


}

module.exports = {
    insertImg
}