// LIBRARIES
import Link from "next/link";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// COMPONENTS
import { Button, ActionIcon, ScrollArea } from "@mantine/core";
import { TextInputComponent } from "../components/TextInputComponent";
import Header from "../components/Header";
import { Modal } from "@mantine/core";

// STYLES
import { IconText } from "../styles/global/iconTextStyle";
import { Container } from "../styles/global/container";
import { ErrorMessage } from "../styles/ErrorMessage";
import {
  ListaBody,
  PrecoQtd,
  buttonController,
  S_Body,
  ViewProductList,
} from "../styles/registroStyle";

//TYPES
import { FormData } from "../types/InputTypes";

//ICONS
import { BsBoxArrowLeft } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

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
        .typeError("O campo quantidade só aceita números"),
    })
  ),
}).required();

const defaultValues: FormData = {
  loja: "",
  lista: [],
};

export default function Registro() {
  const [opened, setOpened] = useState(false);
  const [listaValues, setListaValues] = useState<FormData>({
    loja: "",
    lista: [],
  });

  let initialValue = 0;
  const getTotalPrice = listaValues.lista.reduce(
    (prev, curr) => prev + curr.valor * curr.quantidade,
    initialValue
  );

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
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              flexDirection: "column",
            }}
          >
            <TextInputComponent
              label="Loja ou mercado"
              placeholder="Digite a loja ou mercado da compra"
              formItem="loja"
              register={register}
            />
            {errors.loja && <ErrorMessage>{errors.loja?.message}</ErrorMessage>}
            <Button
              style={{
                margin: "10px 0",
              }}
              variant="filled"
              color="indigo"
              leftIcon={<AiOutlinePlus />}
              uppercase
              onClick={() =>
                append({
                  produto: "",
                  valor: 0,
                  quantidade: 0,
                })
              }
            >
              adicionar produto
            </Button>
            <ScrollArea style={{ height: "55vh" }} type="scroll">
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
            </ScrollArea>
          </section>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Sua lista de compras"
          >
            <h4>{listaValues.loja}</h4>
            <ScrollArea style={{ height: "60vh" }} type="scroll">
              {listaValues.lista.map((lista, index) => {
                const price = lista.quantidade * lista.valor;
                return (
                  <ViewProductList key={index}>
                    {lista.produto} - R${price.toFixed(2)}
                  </ViewProductList>
                );
              })}
            </ScrollArea>
            <div style={{ paddingTop: 5 }}>
              Total da compra: R${getTotalPrice.toFixed(2)}
            </div>
          </Modal>
          <div className={buttonController()}>
            <Button
              onClick={() => {
                const values = getValues();
                setListaValues(values);
                setOpened(true);
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
