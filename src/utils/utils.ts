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

const tranformMonthInText = (date: string) => {
  const month = new Date(date).getMonth() + 1;

  const name = monthsName[month];

  return name;
};

export { tranformMonthInText };
