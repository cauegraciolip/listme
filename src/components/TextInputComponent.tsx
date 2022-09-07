import { TextInput } from "@mantine/core";
import { styled } from "@stitches/react";
import React from "react";

//TYPES
import { FormData } from "../types/InputTypes";

import { Path, UseFormRegister } from "react-hook-form";

const StyledInput = styled(TextInput, {
  "& > label": {
    paddingLeft: 10,
    color: "#F4F4F4",
  },
});

type InputProps = {
  label: string;
  placeholder: string;
  formItem: Path<FormData>;
  register: UseFormRegister<FormData>;
};

export const TextInputComponent = ({
  label,
  placeholder,
  register,
  formItem,
}: InputProps) => (
  <StyledInput
    label={label}
    variant="filled"
    placeholder={placeholder}
    radius="md"
    aria-label={label}
    {...register(formItem)}
  />
);
