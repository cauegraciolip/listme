//LIBRARIES
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
// import { Chart } from "react-google-charts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

//COMPONENTS
import Header from "../components/Header";

//STYLES
import { Container } from "../styles/global/container";
import { styled } from "@stitches/react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

//UTILS
import { sumAllTotals, transformMonthInText } from "../utils/utils";
import { Center } from "@mantine/core";

const S_Div = styled("div", {
  background: "#516B8A",
});

// const options = {
//   title: "Compras em 2022",
//   curveType: "linear",
//   legend: { position: "bottom" },
// };

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  elements: {
    line: {
      fill: true,
    },
    point: {
      hoverRadius: 7,
      radius: 5,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: true,
      text: `Gastos mensais em ${new Date().getFullYear()}`,
    },
  },
};

const labels = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const Home: NextPage = () => {
  const { data: session } = useSession();
  const routes = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dataInfo = useMemo(() => [], []);

  useEffect(() => {
    if (!session) {
      routes.push("/login");
    }
  }, [routes, session]);

  useEffect(() => {
    fetch("/api/compras", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(session),
    })
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    for (let index = 1; index <= 12; index++) {
      const totalByMonth = data.filter(
        (item) => new Date(item.createdAt).getMonth() + 1 === index
      );

      if (dataInfo.length > 12) {
        dataInfo.length = dataInfo.length - 12;
      }

      if (totalByMonth.length === 0) {
        dataInfo.push(0);
      } else {
        const sumWithInitial = totalByMonth.reduce(
          (previousValue, currentValue) => previousValue + currentValue.total,
          0
        );
        dataInfo.push(sumWithInitial);
      }
    }
    setLoading(false);
  }, [data, dataInfo]);

  const dataCharts = {
    labels,
    datasets: [
      {
        label: "Total Gasto",
        data: dataInfo,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <S_Div>
      <Header />
      {loading ? (
        "loading"
      ) : (
        <Container>
          <div
            style={{
              backgroundColor: "#F8F8F8",
              maxWidth: 700,
              margin: "0 auto",
              borderRadius: 10,
            }}
          >
            <Line
              style={{
                backgroundColor: "#22436A",
                borderRadius: 10,
                padding: 10,
              }}
              options={options}
              data={dataCharts}
            />
          </div>
        </Container>
      )}
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
