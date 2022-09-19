//LIBRARIES
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@mantine/core";

//ICONS
import { BsBoxArrowLeft, BsCurrencyDollar } from "react-icons/bs";
import { AiFillCreditCard } from "react-icons/ai";
import { MdDriveFileRenameOutline } from "react-icons/md";

//STYLES
import { Container } from "../styles/global/container";
import { IconText } from "../styles/global/iconTextStyle";
import { S_Body } from "../styles/registroStyle";
import { StyledInput, SelectStyled } from "../styles/global/textInputStyle";

//TYPES
import { FormTypes } from "../types/FormTypes";
import { ErrorMessage } from "../styles/ErrorMessage";
import { tipoCartao } from "../types/FormTypes";

//COMPONENTS
import Header from "../components/Header";

const validationSchema = object({
  tipo: yup.string(),
  nome: yup
    .string()
    .required("O campo nome é obrigatório")
    .min(3, "O campo deve ter no mínimo 3 caracteres"),
  limite: yup.number().typeError("O campo aceita somente números"),
  saldo: yup.number().typeError("O campo aceita somente números"),
});

const defaultValues: FormTypes["cartao"] = {
  nome: "",
  saldo: 0,
  limite: 0,
  tipo: tipoCartao.VA,
};

export default function Cartoes() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes["cartao"]>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<FormTypes["cartao"]> = (data) =>
    console.log(data);

  return (
    <S_Body>
      <Header />
      <Container>
        <Link href="/">
          <IconText>
            <BsBoxArrowLeft />
            <a>Voltar</a>
          </IconText>
        </Link>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: 10 }}>
            <SelectStyled
              data={["VA", "VR", "CREDITO", "DEBITO"]}
              placeholder="Selecione o tipo do cartão"
              label="Tipo do cartão"
              withAsterisk
              icon={<AiFillCreditCard />}
              {...register("tipo")}
            />
            <StyledInput
              label="Nome do cartão"
              placeholder="Insira o nome do cartão"
              withAsterisk
              icon={<MdDriveFileRenameOutline />}
              {...register("nome")}
            />
            {errors.nome && <ErrorMessage>{errors.nome?.message}</ErrorMessage>}
            <StyledInput
              label="Saldo disponível"
              placeholder="Insira o saldo dísponivel no cartão"
              icon={<BsCurrencyDollar />}
              {...register("saldo")}
            />
            {errors.saldo && (
              <ErrorMessage>{errors.saldo?.message}</ErrorMessage>
            )}

            <StyledInput
              label="Limite de uso"
              placeholder="Insira o limite de uso desejado"
              icon={<BsCurrencyDollar />}
              {...register("limite")}
            />
            {errors.limite && (
              <ErrorMessage>{errors.limite?.message}</ErrorMessage>
            )}
          </div>
          <Button type="submit" uppercase>
            cadastrar cartão
          </Button>
        </form>
      </Container>
    </S_Body>
  );
}
