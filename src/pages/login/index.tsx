//LIBRARIES
import { GetServerSideProps } from "next";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSession, signIn } from "next-auth/react";
import { css } from "@stitches/react";
import Image from "next/image";
import Link from "next/link";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";

//COMPONENTS
import { Alert, Button, Center, Text } from "@mantine/core";

//STYLES
import {
  StyledInput,
  StyledPassword,
} from "../../styles/global/textInputStyle";
import logo from "../../assets/images/small_logogreat.png";
import { ErrorMessage } from "../../styles/ErrorMessage";
import { FormBox } from "../../styles/FormBox";

//ICONS
import { MdOutlineAlternateEmail } from "react-icons/md";
import { AiOutlineUnlock, AiOutlineExclamationCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";

//TYPE
import { LoginT } from "../../types/LoginType";

const createAccountLink = css({
  "&:hover": {
    cursor: "pointer",
  },
});

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("O campo e-mail é obrigatório"),
  senha: yup
    .string()
    .min(3, "A senha deve conter no mínimo 3 caracteres")
    .required("O campo senha é obrigatório"),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginT>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginT> = async (data) => {
    setLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.senha,
      redirect: false,
    });

    if (!res.ok) {
      setHidden(false);
      reset();
      setLoading(false);
    }
    router.push("/");
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
        title="E-mail ou senha incorreto"
        color="red"
        style={{ position: "absolute", top: 20 }}
        icon={<AiOutlineExclamationCircle />}
        variant="filled"
        hidden={hidden}
      >
        Tente novamente ou crie uma conta
      </Alert>
      <FormBox style={{ backgroundColor: "#22436A", position: "relative" }}>
        <Center style={{ marginBottom: 15 }} inline>
          <Image src={logo} alt="logo" />
        </Center>
        <Text size="sm" align="center" color="white" weight={300}>
          Faça o login para continuar
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "10px 0" }}>
          <StyledInput
            label="E-mail"
            placeholder="Insira seu e-mail"
            icon={<MdOutlineAlternateEmail />}
            autoComplete="username email"
            {...register("email")}
          />
          {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
          <StyledPassword
            label="Senha"
            placeholder="Insira sua senha"
            icon={<AiOutlineUnlock />}
            autoComplete="current-password"
            {...register("senha")}
          />
          {errors.senha && <ErrorMessage>{errors.senha?.message}</ErrorMessage>}
          <Button
            loading={loading ? true : false}
            uppercase
            fullWidth
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            type="submit"
          >
            entrar
          </Button>
        </form>
        {/* <Text size="xs" color="gray">
          Ou entre com suas redes sociais
        </Text>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            gap: 10,
            marginTop: 10,
          }}
        >
          <Button
            onClick={() => signIn("github")}
            color="dark"
            leftIcon={<ImGithub />}
            variant="filled"
            size="xs"
          >
            <Text size="sm">Github</Text>
          </Button>
          <Button
            onClick={() => signIn("google")}
            leftIcon={<FcGoogle />}
            variant="default"
            size="xs"
          >
            <Text color="gray" size="sm">
              Google
            </Text>
          </Button>
        </div> */}
        <Center style={{ paddingTop: 45 }}>
          <div
            style={{ textAlign: "center", fontSize: "12px", color: "#F8F8F8" }}
          >
            <Text>Sou novo por aqui</Text>
            <div className={createAccountLink()}>
              <Link href="/createAccount">
                <Text component="a" color="indigo">
                  Criar uma conta
                </Text>
              </Link>
            </div>
          </div>
        </Center>
      </FormBox>
    </Center>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
