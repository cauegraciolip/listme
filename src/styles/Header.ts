import { css, styled } from "@stitches/react";

const flexUserAvatar = css({
  display: "flex",
  marginLeft: 10,
  alignItems: "center",
  gap: 10,
  "&:hover": {
    cursor: "pointer",
  },
});

const ShowMobileTarget = styled("div", {
  "@media (min-width: 768px)": {
    display: "none",
  },
});

const ShowDesktopTarget = styled("div", {
  "@media (min-width: 768px)": {
    display: "block",
  },
  "@media (max-width: 767px)": {
    display: "none",
  },
});

export { flexUserAvatar, ShowDesktopTarget, ShowMobileTarget };
