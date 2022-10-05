//LIBRARIES
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { Chart } from "react-google-charts";

//COMPONENTS
import Header from "../components/Header";

//STYLES
import { Container } from "../styles/global/container";
import { styled } from "@stitches/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const S_Div = styled("div", {
  background: "#516B8A",
});

const options = {
  title: "Compras em 2022",
  curveType: "linear",
  legend: { position: "bottom" },
};

const Home: NextPage = () => {
  const { data: session } = useSession();
  const routes = useRouter();
  const [data, setData] = useState([]);
  const teste = [
    ["Ano", "Qtd. Gasta"],
    ["JAN", 1000],
    ["FEV", 1170],
    ["MAR", 660],
    ["ABR", 1030],
    ["MAI", 1480],
    ["JUN", 1070],
    ["JUL", 950],
    ["AGO", 1230],
    ["SET", 1070],
    ["OUT", 1090],
    ["NOV", 1390],
    ["DEZ", 1220],
  ];

  useEffect(() => {
    if (!session) {
      routes.push("/login");
    }
  }, [routes, session]);

  // useEffect(() => {
  //   fetch("/api/compras", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(session),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setData(data.data))
  //     .catch((err) => console.error(err));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <S_Div>
      <Header />
      <Container>
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={teste}
          options={options}
        />
      </Container>
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
