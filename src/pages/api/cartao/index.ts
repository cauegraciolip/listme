import { prisma } from "../../../../prisma/clientConfig";
import { NextApiRequest, NextApiResponse } from "next/types";
import { FormTypes } from "../../../types/FormTypes";

export default async function cartaoHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req.body;

  if (method === "GET") {
    try {
      const cartoes = await prisma.cartoes.findMany();
      return res.status(200).json({ cartoes: cartoes });
    } catch (err) {
      return res.status(500).json({ error: 500, message: "Server Error" });
    }
  } else if (method == "POST") {
    const { nome, saldo, tipo, limite }: FormTypes["cartao"] = req.body;

    const userId = "123456";

    try {
      const cartao = await prisma.cartoes.create({
        data: { nome, saldo, limite, tipo, userId },
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
