const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const xmp = require('exifr')



const insertImg = async (date) => {
    await prisma.user.create({
        data: {
            date: (new Date(date).toISOString()),
        }
    })


}

const insertImg2 = async (filePath) => {
    
    let data = await xmp.parse(filePath, { xmp: true })
    console.log(data.FlightYawDegree)
    await prisma.image.create({
        data: {
            pathImg: filePath,
            gpsLatitude: data.GpsLatitude,
            gpsLongitude: data.GpsLongitude,
            gimballYawDegree: data.FlightYawDegree,
            absoluteAltitude: data.AbsoluteAltitude,

            cadastre : {
                connect : {
                    idCadastre : 1
                }
            }
        }
    })
}

module.exports = {
    insertImg,
    insertImg2
}