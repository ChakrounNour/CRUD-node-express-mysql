import React from "react";
import { BsXLg } from "react-icons/bs";
import CustomButton from "../atoms/button/Button";

export default function CustomButtonDelete({ onClick }) {
  return (
    <CustomButton
      variant="red-outline-border"
      className="px-2.5 py-2.5 xs:px-1.5 xs:py-1.5 sm:px-2 sm:py-2 mr-2"
      icon={<BsXLg />}
      onClick={onClick}
      aria-label="Delete"
    />
  );
}
