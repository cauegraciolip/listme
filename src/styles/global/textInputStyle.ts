import { styled } from "@stitches/react";
import {
  TextInput,
  NativeSelect,
  PasswordInput,
  Autocomplete,
  Select,
} from "@mantine/core";

const StyledInput = styled(TextInput, {
  width: "100%",
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

const SelectProper = styled(Select, {
  marginBottom: 5,
  "& > label": {
    paddingLeft: 5,
    color: "#F4F4F4",
  },
});

const StyledPassword = styled(PasswordInput, {
  marginBottom: 5,
  "& > label": {
    paddingLeft: 5,
    color: "#F4F4F4",
  },
});

const StyledAutoComplete = styled(Autocomplete, {
  marginBottom: 5,
  "& > label": {
    paddingLeft: 5,
    color: "#F4F4F4",
  },
});

export {
  StyledInput,
  SelectStyled,
  StyledPassword,
  StyledAutoComplete,
  SelectProper,
};
