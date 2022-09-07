// LIBRARIES
import Link from "next/link";
import { styled, css } from "@stitches/react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// COMPONENTS
import { Button, ActionIcon } from "@mantine/core";
import { TextInputComponent } from "../components/TextInputComponent";
import Header from "../components/Header";

// STYLES
import { IconText } from "../styles/global/iconTextStyle";
import { Container } from "../styles/global/container";
import { ErrorMessage } from "../styles/ErrorMessage";

//TYPES
import { FormData } from "../types/InputTypes";

//ICONS
import { BsBoxArrowLeft } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

const S_Body = styled("div", {
  backgroundColor: "#516B8A",
});

const buttonController = css({
  backgroundColor: "#39567A",
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  padding: "10px 0",
  justifyContent: "center",
  gap: 5,
  overflow: "auto",
  display: "flex",
});

const PrecoQtd = styled("section", {
  display: "flex",
  alignItems: "center",
  gap: 10,
});

const ListaBody = styled("section", {
  backgroundColor: "#39567A",
  padding: 10,
  marginTop: "10px",
  borderRadius: 6,
  position: "relative",
});

const validationSchema = object({
  loja: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "O campo deve ter no mínimo 3 letras"),
  lista: yup.array().of(
    yup.object({
      produto: yup.string().required("Campo obrigatório"),
      valor: yup
        .number()
        .required("Campo obrigatório")
        .positive()
        .typeError("O campo 'Valor' só aceita números"),
      quantidade: yup
        .number()
        .required("Campo obrigatório")
        .positive()
        .integer("A 'Quantidade' deve ser um número inteiro")
        .typeError("O campo quantidade só aceita números"),
    })
  ),
}).required();

const defaultValues: FormData = {
  loja: "",
  lista: [{ produto: "", valor: 0, quantidade: 0 }],
};

export default function Registro() {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "lista",
    control,
  });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

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
        <form style={{ overflow: "auto" }} onSubmit={handleSubmit(onSubmit)}>
          <section style={{ marginBottom: "50px" }}>
            <TextInputComponent
              label="Loja ou mercado"
              placeholder="Digite a loja ou mercado da compra"
              formItem="loja"
              register={register}
            />
            {errors.loja && <ErrorMessage>{errors.loja?.message}</ErrorMessage>}
            {fields.map((field, index) => {
              return (
                <ListaBody key={field.id}>
                  <TextInputComponent
                    label="Produto"
                    placeholder="Insira o produto selecionado"
                    formItem={`lista.${index}.produto`}
                    register={register}
                  />
                  {errors?.lista?.[index]?.produto && (
                    <ErrorMessage>
                      {errors?.lista?.[index]?.produto?.message}
                    </ErrorMessage>
                  )}

                  <PrecoQtd>
                    <div>
                      <TextInputComponent
                        label="Preço"
                        placeholder="Insira o valor do produto selecionado"
                        formItem={`lista.${index}.valor`}
                        register={register}
                      />
                      {errors?.lista?.[index]?.valor && (
                        <ErrorMessage>
                          {errors?.lista?.[index]?.valor?.message}
                        </ErrorMessage>
                      )}
                    </div>
                    <div>
                      <TextInputComponent
                        label="Quantidade"
                        placeholder="Insira a quantidade do produto selecionado"
                        formItem={`lista.${index}.quantidade`}
                        register={register}
                      />
                      {errors?.lista?.[index]?.quantidade && (
                        <ErrorMessage>
                          {errors?.lista?.[index]?.quantidade?.message}
                        </ErrorMessage>
                      )}
                    </div>
                  </PrecoQtd>
                  <ActionIcon
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 10,
                    }}
                    variant="transparent"
                    color="red"
                    onClick={() => remove(index)}
                  >
                    <FaTrash />
                  </ActionIcon>
                </ListaBody>
              );
            })}
            <ActionIcon
              style={{ margin: "5px 0" }}
              variant="filled"
              color="blue"
              onClick={() =>
                append({
                  produto: "",
                  valor: 0,
                  quantidade: 0,
                })
              }
            >
              <AiOutlinePlus />
            </ActionIcon>
          </section>
          <div className={buttonController()}>
            <Button
              onClick={() => {
                const values = getValues();
                console.log(values);
              }}
              size="xs"
              color="blue"
              uppercase
            >
              visualizar lista
            </Button>
            <Button size="xs" color="green" uppercase type="submit">
              finalizar compra
            </Button>
          </div>
        </form>
      </Container>
    </S_Body>
  );
}
