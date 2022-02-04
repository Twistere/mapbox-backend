const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const xmp = require('exifr')



const insertImg = async (filePath) =>{
    let data = await xmp.parse(filePath, {xmp: true})
    console.log(data.FlightYawDegree)

    await prisma.user.create({
        data : {
            date : new Date(Date.now()).toISOString(),
            cadastre : {
                create : {
                    url : 'google.com',
                    image : {
                        create : {
                            pathImg: filePath,
                            gpsLatitude : data.GpsLatitude,
                            gpsLongitude : data.GpsLongitude,
                            gimballYawDegree : data.FlightYawDegree,
                            absoluteAltitude : data.AbsoluteAltitude

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