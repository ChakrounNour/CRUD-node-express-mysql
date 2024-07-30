import React from "react";
import ButtonPaging from "../atoms/button/ButtonPaging";

const PagingMenu = ({
  pages,
  currentPage,
  onPageChange,
  className,
  ...props
}) => {
  return (
    <div className={`flex space-x-2 ${className}`} {...props}>
      {pages.map((page, index) => (
        <ButtonPaging key={index} onClick={() => onPageChange(page)}>
          {page}
        </ButtonPaging>
      ))}
    </div>
  );
};

export default PagingMenu;
