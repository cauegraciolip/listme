//LIBRARIES
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";

//COMPONENTS
import Header from "../components/Header";

//STYLES
import { Container } from "../styles/global/container";
import { styled } from "@stitches/react";

const S_Div = styled("div", {
  background: "#516B8A",
});

const Home: NextPage = () => {
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
