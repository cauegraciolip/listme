type TCartoes = {
  nome: string;
  saldo: number;
  limite: number;
};

type Lista = {
  produto: string;
  valor: number;
  quantidade: number;
};
interface FormData {
  loja: string;
  lista: Array<Lista>;
}
export interface FormTypes {
  registro: FormData;
  cartao: TCartoes;
}
