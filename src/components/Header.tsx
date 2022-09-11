import Image from "next/image";
import logoPic from "../assets/images/small_logomobile.png";

import { S_Header } from "../styles/global/headerStyle";

import { Menu, ActionIcon, Button } from "@mantine/core";

import { css } from "@stitches/react";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { HiFolder } from "react-icons/hi";
import Link from "next/link";

const displayMenu = css({
  "@media (min-width: 768px)": {
    display: "none",
  },
});

export default function Header() {
  return (
    <S_Header>
      <Image alt="list-me-logo" src={logoPic} layout="fixed" priority />
      <div className={displayMenu()}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="filled" color="indigo">
              <GiHamburgerMenu style={{ color: "#F4F4F4" }} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown sx={{ top: 45, right: 0 }}>
            <Menu.Label>Menu</Menu.Label>
            <Link href="registro">
              <Menu.Item icon={<FaCartPlus />}>Inserir registro</Menu.Item>
            </Link>
            <Menu.Item icon={<HiFolder />}>Adicionar cartão</Menu.Item>
            <Menu.Item icon={<AiFillSetting />}>Configurações</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </S_Header>
  );
}
