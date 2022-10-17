import { styled, css } from "@stitches/react";

const S_Header = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "#151515",
  backgroundColor: "#22436A",
  padding: 10,
  paddingLeft: 20,
  "@media(min-width: 800px)": {
    justifyContent: "space-around",
  },
  "& > svg": {
    "@media(min-width: 768px)": {
      display: "none",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const S_Navbar = styled("ul", {
  display: "flex",
  color: "#F4F4F4",
  listStyle: "none",
  padding: "0 0.5rem",
  "&:hover": {
    cursor: "pointer",
  },
});

const S_NavItem = styled("li", {
  display: "flex",
  alignItems: "center",
  fontSize: "0.8rem",
  gap: 5,
  padding: 10,
  borderRadius: 10,
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#526383",
  },
});

const iconStyled = css({
  fontSize: "1rem",
});

export { iconStyled, S_Header, S_NavItem, S_Navbar };
