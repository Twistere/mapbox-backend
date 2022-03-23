const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const xmp = require("exifr");

const insertImg = async (filePath) => {
  let data = await xmp.parse(filePath, { xmp: true });
  const date = await prisma.user.findMany({ orderBy: { idUser: "desc" } });
  console.log(date.length);
  await prisma.image.create({
    data: {
      pathImg: filePath,
      gpsLatitude: data.GpsLatitude,
      gpsLongitude: data.GpsLongitude,
      gimballYawDegree: data.FlightYawDegree,
      absoluteAltitude: data.AbsoluteAltitude,

      cadastre: {
        connectOrCreate: {
          where: {
            idCadastre: date.length,
          },
          create: {
            idOwner: date.length,
            url: `https://apicarto.ign.fr/api/cadastre/commune?code_insee=`,
          },
        },
      },
    },
  });
};

module.exports = {
  insertImg,
};
