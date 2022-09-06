import { styled } from "@stitches/react";

const IconText = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 5,
  transition: "background-color 0.3s ease-out",
  padding: "0.3rem",
  borderRadius: 4,
  "&:hover": {
    backgroundColor: "#22436A",
    cursor: "pointer",
    transition: "background-color 0.3s ease-out",
  },
  maxWidth: "fit-content",
  "& > *": {
    color: "#F4F4F4",
    textDecoration: "none",
  },
});

export { IconText };
