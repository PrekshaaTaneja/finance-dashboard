import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div
      className="
        flex
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-slate-50
        to-indigo-50
      "
    >
      <Sidebar />

      <div
        className="
          flex-1
          flex
          flex-col
          min-w-0
        "
      >
        <Navbar />

        <main
          className="
            flex-1
            overflow-y-auto
            p-4
            sm:p-6
            lg:p-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;