import React from "react";

function DashboardHeading({ title = "", desc = "", children }) {
  return (
    <div className="mb-10 flex items-start justify-between">
      <div className="">
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      {children}
    </div>
  );
}

export default DashboardHeading;
