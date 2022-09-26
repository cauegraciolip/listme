import { NextApiRequest, NextApiResponse } from "next/types";

import { prisma } from "../../../../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    const { email, password } = req.body;

    let userExist = await prisma.user.findUnique({ where: { email: email } });

    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "E-mail inválido" });
    }

    if (!(await bcrypt.compare(password, userExist.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Usuário ou senha incorretos!" });
    }

    userExist.password = undefined;

    return res
      .status(200)
      .json({ data: userExist, success: true, message: "Usuário logado" });
  }
}
