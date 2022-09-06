import { TextInput } from "@mantine/core";
import { styled } from "@stitches/react";
import React from "react";

import { Path, UseFormRegister } from "react-hook-form";

const StyledInput = styled(TextInput, {
  "& > label": {
    paddingLeft: 10,
    color: "#F4F4F4",
  },
});

interface IFormValues {
  loja: string;
  produto: string;
  valor: number;
  quantidade: number;
}

type InputProps = {
  label: string;
  placeholder: string;
  required: boolean;
  formItem: Path<IFormValues>;
  length: number;
  register: UseFormRegister<IFormValues>;
};

export const TextInputComponent = ({
  label,
  placeholder,
  required,
  register,
  formItem,
  length,
}: InputProps) => (
  <StyledInput
    label={label}
    variant="filled"
    placeholder={placeholder}
    radius="md"
    aria-label={label}
    {...register(formItem, { required, minLength: length })}
  />
);
