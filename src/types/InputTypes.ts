type Lista = {
  produto: string;
  valor: number;
  quantidade: number;
};
interface FormData {
  loja: string;
  lista: Array<Lista>;
}

export type { Lista, FormData };
