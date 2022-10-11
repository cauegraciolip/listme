type Compras = {
  id: string;
  userId: string;
  loja: string;
  total: number;
  createdAt: string;
  updatedAt: string;
};

const monthsName = {
  1: "Jan",
  2: "Fev",
  3: "Mar",
  4: "Abr",
  5: "Mai",
  6: "Jun",
  7: "Jul",
  8: "Ago",
  9: "Set",
  10: "Out",
  11: "Nov",
  12: "Dez",
};

const transformMonthInText = (date: string) => {
  const month = new Date(date).getMonth() + 1;

  const name = monthsName[month];

  return name;
};

const sumAllTotals = (arr: Compras[], external: any[]) => {
  for (let index = 1; index <= 12; index++) {
    const totalByMonth = arr.filter(
      (item) => new Date(item.createdAt).getMonth() + 1 === index
    );

    if (totalByMonth.length === 0) {
      console.log(0);
      external.push(0);
    } else {
      const sumWithInitial = totalByMonth.reduce(
        (previousValue, currentValue) => previousValue + currentValue.total,
        0
      );

      console.log(sumWithInitial);

      external.push(sumWithInitial);
    }
  }

  return;
};

export { transformMonthInText, sumAllTotals };
