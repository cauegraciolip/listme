import { styled, css } from "@stitches/react";
const S_Body = styled("div", {
  backgroundColor: "#516B8A",
});

const buttonController = css({
  backgroundColor: "#39567A",
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  padding: "10px 0",
  justifyContent: "center",
  gap: 5,
  overflow: "auto",
  display: "flex",
});

const PrecoQtd = styled("section", {
  display: "flex",
  alignItems: "center",
  gap: 10,
});

const ListaBody = styled("section", {
  backgroundColor: "#39567A",
  padding: 10,
  marginTop: "10px",
  borderRadius: 6,
  position: "relative",
});

export { ListaBody, PrecoQtd, buttonController, S_Body };
