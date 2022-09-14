export enum tipoCartao {
  VA = "Vale Alimentação",
  VR = "Vale Refeição",
  CREDITO = "Crédito",
  DEBITO = "Débito",
}

type TCartoes = {
  nome: string;
  saldo: number;
  limite: number;
  tipo: string;
};

type Lista = {
  produto: string;
  valor: number;
  quantidade: number;
};
interface FormData {
  loja: string;
  cartao: string;
  lista: Array<Lista>;
}
export interface FormTypes {
  registro: FormData;
  cartao: TCartoes;
}
