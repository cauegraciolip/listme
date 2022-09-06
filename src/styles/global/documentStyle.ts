import { globalCss } from "@stitches/react";

const globalStyle = globalCss({
  "*": {
    margin: 0,
    padding: 0,
  },
  html: {
    boxSizing: "border-box",
    fontSize: 16,
    fontWeight: 300,
    color: "#303030",
    backgroundColor: "#516B8A",
  },
  h1: { fontSize: "1.8rem", fontWeight: 700 },
  h2: { fontSize: "1.6rem", fontWeight: 600 },
  h3: { fontSize: "1.4rem", fontWeight: 500 },
  h4: { fontSize: "1.2rem", fontWeight: 400 },
  h5: { fontSize: "1rem", fontWeight: 300 },
  h6: { fontSize: "0.8rem", fontWeight: 300 },
  p: { fontSize: "1rem" },
  label: { fontSize: "1rem" },
  span: { fontSize: "1rem" },
});

export { globalStyle };
