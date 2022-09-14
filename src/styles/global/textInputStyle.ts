import { styled } from "@stitches/react";
import { TextInput, NativeSelect } from "@mantine/core";

const StyledInput = styled(TextInput, {
  marginBottom: 5,
  "& > label": {
    paddingLeft: 5,
    color: "#F4F4F4",
  },
});

const SelectStyled = styled(NativeSelect, {
  marginBottom: 5,
  "& > label": {
    paddingLeft: 5,
    color: "#F4F4F4",
  },
});

export { StyledInput, SelectStyled };
