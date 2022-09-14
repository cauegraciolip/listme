import { NextApiRequest, NextApiResponse } from "next/types";
import { v4 as uuid } from "uuid";

import { prisma } from "../../../../prisma/clientConfig";
import bcrypt from "bcrypt";
export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    const users = await prisma.user.findMany();

    return res.status(200).json({ data: users });
  } else if (method === "POST") {
    let { username, email, password } = req.body;

    const userAlreadyExist = await prisma.user.findMany({
      where: { username: username },
    });

    const emailAlreadyExist = await prisma.user.findMany({
      where: { email: email },
    });

    if (!!userAlreadyExist) {
      return res
        .status(404)
        .json({ message: "Já existe um usuário com mesmo nome!" });
    } else if (!!emailAlreadyExist) {
      return res
        .status(404)
        .json({ message: "Já existe um usuário com mesmo e-mail!" });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const userId = uuid();

    password = hashPassword;

    const users = await prisma.user.create({
      data: { username, email, password, userId },
    });

    return res.status(201).json({ data: users });
  } else if (method === "DELETE") {
    const { id } = req.body;

    await prisma.user.delete({ where: { id: id } });

    return res.status(201).json({ message: "Usuário excluído com sucesso!" });
  }
}
