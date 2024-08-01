import React from "react";
import { BsPencil } from "react-icons/bs";
import CustomButton from "../atoms/button/Button";

export default function CustomButtonEdit({ onClick }) {
  return (
    <CustomButton
      variant="secondary-outline"
      className="bg-transparent px-2.5 py-2.5 xs:px-1.5 xs:py-1.5 sm:px-2 sm:py-2 mr-2"
      icon={<BsPencil />}
      onClick={onClick}
      aria-label="Edit"
    />
  );
}
