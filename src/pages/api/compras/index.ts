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

  const actualDateYear = new Date(new Date().getFullYear(), 0, 1);

  const findCompras = await prisma.compras.findMany({
    where: {
      AND: [{ userId: findUser.id }, { createdAt: { gte: actualDateYear } }],
    },
    orderBy: [{ createdAt: "asc" }],
  });

  return res.status(201).json({ data: findCompras });
}
