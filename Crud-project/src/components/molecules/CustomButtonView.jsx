import React from "react";
import CustomButton from "../atoms/button/Button";
import { BsFillEyeFill } from "react-icons/bs";

function CustomButtonView({ onClick }) {
  return (
    <CustomButton
      variant="blue-outline"
      className="bg-transparent px-2.5 py-2.5 xs:px-1.5 xs:py-1.5 sm:px-2 sm:py-2 mr-2"
      icon={<BsFillEyeFill />}
      onClick={onClick}
      aria-label="Edit"
    />
  );
}

export default CustomButtonView;
