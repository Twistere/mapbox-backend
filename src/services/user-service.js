const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const insertDate = async (date) => {
  await prisma.user.create({
    data: {
      date: new Date(date).toISOString(),
    },
  });
};

const fetchDate = async () => {
  return await prisma.user.findMany({
    include: {
      cadastre: {
        include: {
          image: true,
        },
      },
    },
  });
};


module.exports = {
  insertDate,
  fetchDate
};
