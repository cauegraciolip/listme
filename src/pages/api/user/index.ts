import { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    let { name, email, password } = req.body;

    const emailAlreadyExist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!!emailAlreadyExist) {
      return res.status(404).json({
        success: false,
        message: "Já existe um usuário com mesmo e-mail!",
        complement: "Utilize outro e-mail para cadastro",
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    password = hashPassword;

    let users = await prisma.user.create({
      data: { email, password, name },
    });

    users.password = undefined;

    return res.status(201).json({
      data: users,
      success: true,
      message: "Usuário criado com sucesso",
      complement: "Faça o login para acessar o aplicativo",
    });
  } else if (method === "DELETE") {
    const { id } = req.body;

    await prisma.user.delete({ where: { id: id } });

    return res.status(201).json({ message: "Usuário excluído com sucesso!" });
  } else if (method === "PUT") {
    const { name, email } = req.body;

    const user = await prisma.user.update({
      where: { email: email },
      data: { name: name },
    });

    return res.status(201).json({ data: "Usuário atualizado" });
  }
}
