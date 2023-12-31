"use client";

import Select from "react-select";
import { FC } from "react";

type OptionType = {
  value: string;
  label: string;
  color?: string;
};

const Dropdown: FC<{ options: OptionType[]; placeholder?: string }> = ({
  options,
  placeholder,
}) => {
  return (
    <Select
      isMulti
      isSearchable={false}
      placeholder={placeholder}
      styles={{
        multiValue: (base) => ({
          ...base,
          borderRadius: 5,
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "#fff",
        }),
        control: () => {
          return {
            border:
              "var(--vz-border-width) solid var(--vz-input-border-custom)",
            borderRadius: "var(--vz-border-radius)",
            backgroundColor: "var(--vz-input-bg-custom)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          };
        },
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          neutral5: "red",
          danger: "red",
          neutral10: "#6691e7",
          neutral50: "rgb(206, 212, 218)",
          primary50: "var(--vz-tertiary-bg)",
          primary75: "red",
          primary25: "var(--vz-tertiary-bg)",
          neutral0: "var(--vz-input-bg-custom)",
        },
      })}
      closeMenuOnSelect={false}
      options={options}
    />
  );
};

export default Dropdown;
