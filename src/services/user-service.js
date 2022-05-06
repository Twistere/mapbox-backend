const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const insertDate = async (date) => {
  await prisma.user.create({
    data: {
      date: new Date(date).toISOString('fr-FR', { timeZone: 'UTC' }),
    },
  });
};

const fetchAll = async (idUser) => {
  return await prisma.user.findUnique({
    where: {
      idUser: parseInt(idUser),
    },
      include: {
        cadastre: {
          include: {
            image: true,
          },
        },
      },
  });
};

const fetchDate = async () => {
  return await prisma.user.findMany();
};


module.exports = {
  insertDate,
  fetchDate,
  fetchAll
};
