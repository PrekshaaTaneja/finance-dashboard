import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-slate-50
        to-indigo-50
      "
    >

      {/* Sidebar */}
      <div
        className="
          fixed
          left-0
          top-0
          h-screen
          w-64
          z-50
        "
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className="
          ml-64
          min-h-screen
          flex
          flex-col
        "
      >

        {/* Navbar */}
        <div
          className="
            sticky
            top-0
            z-40
          "
        >
          <Navbar />
        </div>

        {/* Page Content */}
        <main
          className="
            flex-1
            overflow-y-auto
            p-4
            sm:p-6
            lg:p-8
            container-app
          "
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;