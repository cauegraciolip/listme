import { prisma } from "../../prisma/clientConfig";

export default async function getUsers() {
  const users = await prisma.user.findMany();

  return users;
}
