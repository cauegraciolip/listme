import {
  Center,
  Title,
  Text,
  Box,
  Popover,
  Progress,
  Button,
  Divider,
  Alert,
} from "@mantine/core";
import { FormBox } from "../../styles/FormBox";
import {
  StyledInput,
  StyledPassword,
} from "../../styles/global/textInputStyle";

import { BsCheckCircleFill, BsCheckLg } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

import * as yup from "yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { UserCreateType } from "../../types/CreateUserType";
import { ErrorMessage } from "../../styles/ErrorMessage";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useRouter } from "next/router";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("E-mail é um campo obrigatório"),
  name: yup.string().required("O campo de nome é obrigatório"),
  password: yup.string().required(),
  senhaConfirma: yup
    .string()
    .required("É obrigatório confirmar a senha digitada")
    .oneOf([yup.ref("password")], "As senhas não conferem"),
});

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <BsCheckLg size={14} /> : <TiDelete size={14} />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Deve conter números" },
  { re: /[a-z]/, label: "Letras minúsculas" },
  { re: /[A-Z]/, label: "Letras maiúsculas" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Caracteres especiais" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateType>({
    resolver: yupResolver(validationSchema),
  });

  const [hidden, setHidden] = useState(true);
  const [message, setMessage] = useState({ message: "", complement: "" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState("");
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  const route = useRouter();

  const createUser: SubmitHandler<UserCreateType> = async (data) => {
    setLoading(true);
    fetch("/api/user", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage({ message: data.message, complement: data.complement });
        if (!data.success) {
          setHidden(false);
        } else {
          setTimeout(() => {
            route.push("/login");
          }, 4000);
        }

        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!hidden) {
      setTimeout(() => {
        setHidden(true);
      }, 4000);
    }
  }, [hidden]);

  return (
    <Center
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#516B8A",
      }}
    >
      <Alert
        title={message.message}
        color={success ? "green" : "red"}
        style={{ position: "absolute", top: 20 }}
        icon={success ? <BsCheckCircleFill /> : <AiOutlineExclamationCircle />}
        variant="filled"
        hidden={hidden}
      >
        {message.complement}
      </Alert>
      <FormBox>
        <Center>
          <Title order={2} color="white">
            Criar conta
          </Title>
        </Center>
        <Divider my="sm" />
        <form onSubmit={handleSubmit(createUser)}>
          <StyledInput
            label="Nome completo"
            placeholder="Insira o nome completo"
            autoComplete="fullname"
            {...register("name")}
          />
          {errors.name && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
          <StyledInput
            label="E-mail"
            placeholder="Insira o e-mail para cadastro"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
          <Popover
            opened={popoverOpened}
            position="bottom"
            width="target"
            transition="pop"
          >
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
              >
                <StyledPassword
                  withAsterisk
                  label="Senha"
                  placeholder="Insira uma senha"
                  autoComplete="new-password"
                  {...register("password")}
                  value={value}
                  onChange={(event) => setValue(event.currentTarget.value)}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress
                color={color}
                value={strength}
                size={5}
                style={{ marginBottom: 10 }}
              />
              <PasswordRequirement
                label="Mínimo 6 digitos"
                meets={value.length > 5}
              />
              {checks}
            </Popover.Dropdown>
          </Popover>
          <StyledPassword
            label="Confirme sua senha"
            placeholder="Digite a senha inserida no campo anterior"
            autoComplete="new-password"
            {...register("senhaConfirma")}
          />
          {errors.senhaConfirma && (
            <ErrorMessage>{errors.senhaConfirma?.message}</ErrorMessage>
          )}
          <Button
            loading={loading}
            uppercase
            fullWidth
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            type="submit"
          >
            CRIAR CONTA
          </Button>
        </form>
      </FormBox>
    </Center>
  );
}
