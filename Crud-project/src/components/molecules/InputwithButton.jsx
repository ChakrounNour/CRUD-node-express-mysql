import React from "react";
import CustomInput from "../atoms/input/input";
import CustomButton from "../atoms/button/Button";

function InputwithButton({
  placeholder,
  value,
  type,
  onChange,
  variant,
  onClick,
  text,
}) {
  return (
    <div>
      <CustomInput
        placeholder={placeholder}
        value={value}
        type={type}
        inputClassName="mr-4 xs:text-md border-2 border-gray p-2 border-bold focus:outline-none"
        onChange={onChange}
      />

      <CustomButton
        className="px-2 py-2 rounded-sm"
        variant={variant}
        onClick={onClick}
        aria-label="Ok"
      >
        {text}
      </CustomButton>
    </div>
  );
}

export default InputwithButton;
