import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../classNames";

export default function CustomButton({
  id,
  className,
  children,
  icon,
  onClick,
  variant,
  ...props
}) {
  return (
    <button
      id={id}
      className={classNames(
        "relative cursor-pointer select-none text-center rounded-full",
        // Variante primary
        variant === "primary"
          ? "bg-primary ring-1 ring-primary text-white"
          : "",
        // Variante secondary
        variant === "secondary"
          ? "bg-secondary ring-1 ring-secondary text-white"
          : "",
        variant === "secondary-outline"
          ? "bg-white ring-1 ring-secondary text-secondary hover:bg-secondary hover:text-white "
          : "",
        // Variante danger
        variant === "red-outline-border"
          ? "bg-white ring-1 ring-red text-red hover:bg-red hover:text-white "
          : "",
        // Variante blue
        variant === "blue" ? "bg-blueDark ring-blueDark ring-1 text-white" : "",
        variant === "blue-outline"
          ? "bg-white ring-1 ring-blueDark text-blueDark hover:bg-blueDark hover:text-white "
          : "",
        // Variante border
        variant === "border"
          ? "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          : "",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {icon}

      {children}
    </button>
  );
}

CustomButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "secondary-outline",
    "red-outline-border",
    "blue",
    "blue-outline",
    "border",
  ]).isRequired,
  icon: PropTypes.element,
  id: PropTypes.string,
};
