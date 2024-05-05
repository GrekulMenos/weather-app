import { ChangeEvent } from "react";

export type optionType = {
  name: string;
  lat: number;
  lon: number;
};

export type Props = {
  input: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  options: [];
  onOptionSelect: (optiton: optionType) => void;
  onSubmit: () => void;
};
