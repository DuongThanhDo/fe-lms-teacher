import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NoContainer = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default NoContainer;