import React from "react";

export default function ButtonPaging({ content, onClick, active, disabled }) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
      ${active ? "bg-blue500 text-white" : "text-red"}
      ${
        !disabled
          ? "bg-black hover:bg-red hover:text-white"
          : "text-blue500 bg-white cursor-not-allowed"
      }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
