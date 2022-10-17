import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function getCards(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.body;

  const users = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (users) {
    const cartoes = await prisma.cartoes.findMany({
      where: { userId: users.id },
    });

    const cartoesTratados = cartoes.map((cartao: any) => ({
      value: cartao.id,
      label: cartao.nome,
    }));
    return res.status(201).json({
      success: true,
      message: "Cartões encontrados",
      content: cartoesTratados,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Usário não encontrado",
      content: null,
    });
  }
}
