import React from "react";

const ButtonPaging = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-blueDark text-white rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default ButtonPaging;
