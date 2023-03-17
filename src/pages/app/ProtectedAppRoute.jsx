import React from "react";
import { Outlet } from "react-router";
import Header from "../../components/app/Header";

const ProtectedAppRoute = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedAppRoute;
