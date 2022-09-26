import { prisma } from "../../lib/prisma";

export default async function getUsers() {
  const users = await prisma.user.findMany();

  return users;
}
