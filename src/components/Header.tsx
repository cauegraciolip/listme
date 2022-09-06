import Image from "next/image";
import logoPic from "../assets/images/small_logomobile.png";

import { S_Header } from "../styles/global/headerStyle";

import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  return (
    <S_Header>
      <Image alt="list-me-logo" src={logoPic} layout="fixed" priority />
      <GiHamburgerMenu style={{ color: "#F4F4F4" }} />
    </S_Header>
  );
}
