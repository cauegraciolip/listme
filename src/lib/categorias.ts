import { prisma } from "../../prisma/clientConfig";

export default async function getCategorias() {
  const categorias = await prisma.categorias.findMany();

  return categorias;
}
