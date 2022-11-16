import React, { useState } from "react";
import { DropdownProvider } from "./dropdown-context";

function Dropdown({
  placeholder = "Please select an option",
  children,
  ...props
  }) {
  // const [show, setShow] = useState(false);

  // const handleToggleDropdown = () => {
  //   setShow(!show);
  // };

  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">
        { children }
      </div>
    </DropdownProvider>
  );
}

export default Dropdown;
