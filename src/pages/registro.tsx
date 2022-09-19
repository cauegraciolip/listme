//REACT
import { useState } from "react";

// LIBRARIES
import Link from "next/link";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// COMPONENTS
import { Button, ActionIcon, ScrollArea, Modal } from "@mantine/core";
import Header from "../components/Header";

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
import { SelectStyled, StyledInput } from "../styles/global/textInputStyle";

//TYPES
import { FormTypes } from "../types/FormTypes";

//ICONS
import { BsBoxArrowLeft, BsCurrencyDollar } from "react-icons/bs";

import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash, FaStore } from "react-icons/fa";
import { MdLocalGroceryStore, MdPlusOne } from "react-icons/md";

const validationSchema = object({
  loja: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "O campo deve ter no mínimo 3 letras"),
  cartao: yup.string(),
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

export default function Registro() {
  const [opened, setOpened] = useState(false);
  const [cardNames, setCardNames] = useState([
    "-- Nenhum cartão cadastrado --",
  ]);
  const [listaValues, setListaValues] = useState<FormTypes["registro"]>({
    loja: "",
    cartao: "",
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
  } = useForm<FormTypes["registro"]>({
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "lista",
    control,
  });

  const onSubmit: SubmitHandler<FormTypes["registro"]> = (data) =>
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
        <form style={{ overflow: "auto" }} onSubmit={handleSubmit(onSubmit)}>
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              flexDirection: "column",
            }}
          >
            <StyledInput
              label="Loja ou mercado"
              placeholder="Digite a loja ou mercado da compra"
              icon={<FaStore />}
              withAsterisk
              {...register("loja")}
            />
            {errors.loja && <ErrorMessage>{errors.loja?.message}</ErrorMessage>}
            <SelectStyled
              data={cardNames}
              label="Cartão utilizado"
              placeholder="Selecione o cartão utilizado na compra"
              withAsterisk
              {...register("cartao")}
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
                    <StyledInput
                      label="Produto"
                      placeholder="Insira o produto selecionado"
                      icon={<MdLocalGroceryStore />}
                      withAsterisk
                      {...register(`lista.${index}.produto`)}
                    />
                    {errors?.lista?.[index]?.produto && (
                      <ErrorMessage>
                        {errors?.lista?.[index]?.produto?.message}
                      </ErrorMessage>
                    )}
                    <PrecoQtd>
                      <div>
                        <StyledInput
                          label="Preço"
                          placeholder="Insira o valor do produto selecionado"
                          icon={<BsCurrencyDollar />}
                          withAsterisk
                          {...register(`lista.${index}.valor`)}
                        />
                        {errors?.lista?.[index]?.valor && (
                          <ErrorMessage>
                            {errors?.lista?.[index]?.valor?.message}
                          </ErrorMessage>
                        )}
                      </div>
                      <div>
                        <StyledInput
                          label="Quantidade"
                          placeholder="Insira a quantidade do produto selecionado"
                          icon={<MdPlusOne />}
                          withAsterisk
                          {...register(`lista.${index}.quantidade`)}
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
