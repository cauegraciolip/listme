import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handleCompras(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.body;

  const findUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  const findCompras = await prisma.compras.findMany({
    where: { userId: findUser.id },
    include: {
      produtos: true,
    },
  });

  for (let index in findCompras) {
    console.log(findCompras[index]);
  }

  return res.status(201).json({ data: findCompras });
}
