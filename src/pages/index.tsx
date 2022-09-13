import type { NextPage } from "next";

import { styled } from "@stitches/react";
import { Container } from "../styles/global/container";

const S_Div = styled("div", {
  background: "#516B8A",
});

const Home: NextPage = () => {
  return (
    <S_Div>
      <Container></Container>
    </S_Div>
  );
};

export default Home;
