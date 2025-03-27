// rafce
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <div style={{ padding: "62px 0 20px 80px", }}>{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
