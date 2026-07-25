import React, { ReactNode } from "react";
import DashboardLayout from "../components/Dashboard/D_Layout/DashboarLayout";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};

export default Layout;