import { prisma } from "../../lib/prisma";

export default async function getCategorias() {
  const categorias = await prisma.categorias.findMany();

  return categorias;
}
