import React from "react";
import { useDropdown } from "./dropdown-context";

// List option
const List = ({ children }) => {
  const { show } = useDropdown(); // Lấy show từ dropdown context

  return (
    <>
      {
        // Nếu có show thì hiện children 
        show && (
        <div className="absolute top-full left-0 w-full bg-white shadow-sm">
          {children}
        </div>
      )
      }
    </>
  );
};

export default List;
