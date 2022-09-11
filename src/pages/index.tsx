import type { NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header";

import { styled, css } from "@stitches/react";

import { BsFillPlusCircleFill } from "react-icons/bs";

import { IconText } from "../styles/global/iconTextStyle";
import { Container } from "../styles/global/container";

const S_Div = styled("div", {
  background: "#516B8A",
});

const Home: NextPage = () => {
  return (
    <S_Div>
      <Container>
        <Link href="/registro">
          <IconText>
            <BsFillPlusCircleFill />
            <a>Inserir Registro</a>
          </IconText>
        </Link>
      </Container>
    </S_Div>
  );
};

export default Home;
