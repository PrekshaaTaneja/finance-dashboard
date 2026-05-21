import {
  Menu,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";

import { useSidebarStore } from "@/store/sidebarStore";

const Navbar = () => {

  const { user, logout } = useAuth();

  const { toggleSidebar } =
    useSidebarStore();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className="
        h-16
        bg-white/80
        backdrop-blur-xl
        border-b
        border-slate-200
        px-4
        lg:px-8
        flex
        items-center
        justify-between
        sticky
        top-0
        z-30
      "
    >
      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={toggleSidebar}
          className="
            lg:hidden
            text-slate-700
          "
        >
          <Menu size={24} />
        </button>

        <div>
          <h2
            className="
              text-lg
              lg:text-xl
              font-bold
              text-slate-800
            "
          >
            FinSphere Dashboard
          </h2>

          <p
            className="
              hidden
              sm:block
              text-xs
              text-slate-500
            "
          >
            Financial analytics & insights
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* User */}
        <div className="flex items-center gap-3">

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-gradient-to-r
              from-indigo-500
              to-violet-500
              text-white
              flex
              items-center
              justify-center
              font-semibold
              shadow-md
            "
          >
            {user?.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div className="hidden sm:block">
            <p
              className="
                text-sm
                font-semibold
                text-slate-800
              "
            >
              {user?.name}
            </p>

            <div className="flex items-center gap-2">

              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                {user?.role}
              </p>

              <button
                onClick={logout}
                className="
                  text-xs
                  text-red-500
                "
              >
                Logout
              </button>

            </div>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;