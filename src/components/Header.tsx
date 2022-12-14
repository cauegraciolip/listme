//LIBRARIES
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

//COMPONENTS
import Image from "next/image";
import { Menu, ActionIcon, Avatar, Text, Center } from "@mantine/core";

//STYLES
import { S_Header } from "../styles/global/headerStyle";
import {
  flexUserAvatar,
  ShowDesktopTarget,
  ShowMobileTarget,
} from "../styles/Header";

//ICON
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { HiFolder } from "react-icons/hi";

//LOGO
import logoPic from "../assets/images/small_logomobile.png";

export default function Header() {
  const { data: session } = useSession();

  return (
    <S_Header>
      <Link href="/">
        <a style={{ height: 25 }}>
          <Image alt="list-me-logo" src={logoPic} layout="fixed" priority />
        </a>
      </Link>
      <div>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <div>
              <ShowMobileTarget>
                <ActionIcon variant="filled" color="indigo">
                  <GiHamburgerMenu style={{ color: "#F4F4F4" }} />
                </ActionIcon>
              </ShowMobileTarget>
              <ShowDesktopTarget>
                <div className={flexUserAvatar()}>
                  {session?.user?.image ? (
                    <Avatar src={session?.user?.image} radius="xl" />
                  ) : (
                    <Avatar radius="xl" variant="filled" size="sm" />
                  )}
                </div>
              </ShowDesktopTarget>
            </div>
          </Menu.Target>
          <Menu.Dropdown sx={{ top: 45, right: 0 }}>
            <Menu.Label>Usuário</Menu.Label>
            <div className={flexUserAvatar()}>
              {session?.user?.image ? (
                <Avatar radius="xl" src={session?.user?.image} />
              ) : (
                <Avatar radius="xl" variant="filled" size="sm" />
              )}
              <Text component="span" color="gray" size="sm">
                {session?.user?.name}
              </Text>
            </div>

            <Menu.Label>Menu</Menu.Label>
            <Link href="registro">
              <Menu.Item icon={<FaCartPlus />}>Inserir registro</Menu.Item>
            </Link>
            <Link href="cartoes">
              <Menu.Item icon={<HiFolder />}>Adicionar cartão</Menu.Item>
            </Link>
            <Menu.Item icon={<AiFillSetting />}>Configurações</Menu.Item>
            <Menu.Divider />
            <Menu.Item icon={<ImExit />} onClick={() => signOut()}>
              Sair
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </S_Header>
  );
}
