// LIBRARIES
import Link from "next/link";
import { styled, css } from "@stitches/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BsBoxArrowLeft } from "react-icons/bs";

// COMPONENTS
import { Button } from "@mantine/core";
import { TextInputComponent } from "../components/TextInputComponent";
import Header from "../components/Header";

// STYLES
import { IconText } from "../styles/global/iconTextStyle";
import { Container } from "../styles/global/container";
import { ErrorMessage } from "../styles/ErrorMessage";

const S_Body = styled("div", {
  backgroundColor: "#516B8A",
});

interface Inputs {
  loja: string;
  produto: string;
  valor: number;
  quantidade: number;
}

export default function Registro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
          <TextInputComponent
            label="Loja ou mercado"
            placeholder="Digite a loja ou mercado da compra"
            formItem="loja"
            register={register}
            required
            length={3}
          />
          {errors.loja && <ErrorMessage>Campo obrigatório</ErrorMessage>}
          <Button size="xs" color="green" uppercase type="submit">
            finalizar compra
          </Button>
        </form>
      </Container>
    </S_Body>
  );
}
