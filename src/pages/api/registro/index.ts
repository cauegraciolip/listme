import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

type Produtos = {
  produto: string;
  valor: number;
  quantidade: number;
};

type Lista = {
  valor: number;
  quantidade: number;
};

export default async function handleRegister(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    const { lista, cartao, loja, user } = req.body;

    const initialValue = 0;
    const getTotalValue = lista.reduce(
      (prev: number, curr: Lista) => prev + curr.valor * curr.quantidade,
      initialValue
    );

    const findUser = await prisma.user.findUnique({
      where: { email: user.user.email },
    });

    if (!!findUser) {
      const compra = await prisma.compras.create({
        data: {
          loja,
          cartaoId: cartao,
          userId: findUser.id,
          total: parseFloat(getTotalValue.toFixed(2)),
        },
      });

      if (compra) {
        lista.forEach(async (produtos: Produtos) => {
          await prisma.produtos.create({
            data: {
              nome: produtos.produto,
              valor: produtos.valor,
              quantidade: produtos.quantidade,
              comprasId: compra.id,
            },
          });
        });
      }
      return res.json({
        compra: compra,
        success: true,
        title: "Podemos ir embora!",
        message: "Compra finalizada com sucesso",
      });
    } else {
      return res.status(400).json({
        success: false,
        title: "Alguma coisa deu errado",
        message: "Tente novamente mais tarde",
      });
    }
  }
}
