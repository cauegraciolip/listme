import type { GetServerSideProps, NextPage } from "next";

import { styled } from "@stitches/react";
import { Container } from "../styles/global/container";
import Header from "../components/Header";
import { getSession, signOut, useSession } from "next-auth/react";
import { Button, Image } from "@mantine/core";

const S_Div = styled("div", {
  background: "#516B8A",
});

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <S_Div>
      <Header />
      <Container>
        <p>{session?.user?.name}</p>
        <p>{session?.user?.email}</p>
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="profile-photo"
            width={88}
            height={88}
          />
        )}
        <Button onClick={() => signOut()} uppercase>
          sair
        </Button>
      </Container>
    </S_Div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  console.log(session);

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
