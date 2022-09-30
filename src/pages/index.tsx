//LIBRARIES
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";

//COMPONENTS
import Header from "../components/Header";

//STYLES
import { Container } from "../styles/global/container";
import { styled } from "@stitches/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const S_Div = styled("div", {
  background: "#516B8A",
});

const Home: NextPage = () => {
  const { data: session } = useSession();
  const routes = useRouter();

  useEffect(() => {
    if (!session) {
      routes.push("/login");
    }
  }, [routes, session]);

  return (
    <S_Div>
      <Header />
      <Container></Container>
    </S_Div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
