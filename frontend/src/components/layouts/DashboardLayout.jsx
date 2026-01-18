import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="relative min-h-screen z-0">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <main className="relative z-10 px-4 pt-4 pb-4 max-w-7xl mx-auto">
          {children}
        </main>
      )}
    </div>
  );
};

export default DashboardLayout;
