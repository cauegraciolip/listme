import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handlerProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const produtos = await prisma.produtos.findMany();

  return res.status(200).json({ data: produtos });
}
