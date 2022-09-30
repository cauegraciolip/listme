import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    const cartoes = await prisma.cartoes.findMany({
      where: {},
    });
  } else if (method === "POST") {
    const { data } = req.body;

    const { user } = req.body;

    const findUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    try {
      const cartao = await prisma.cartoes.create({
        data: {
          tipo: data.tipo,
          nome: data.nome,
          saldo: data.saldo,
          limite: data.limite,
          userId: findUser.id,
        },
      });

      return res.status(201).json({
        data: cartao,
        message: "Cartão criado com sucesso!",
        success: true,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send("Server Error");
    }
  }
}
