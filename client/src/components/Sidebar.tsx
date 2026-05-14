import {
  LayoutDashboard,
  Receipt,
  Users,
  X,
  Wallet,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useSidebarStore } from "@/store/sidebarStore";

const Sidebar = () => {

  const {
    isOpen,
    closeSidebar,
  } = useSidebarStore();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
        />
      )}

      <aside
        className={`
          fixed
          lg:static
          top-0
          left-0
          z-50
          h-screen
          w-64
          bg-slate-900
          text-white
          flex
          flex-col
          border-r
          border-slate-800
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Top */}
        <div
          className="
            px-6
            py-8
            border-b
            border-slate-800
            flex
            items-start
            justify-between
          "
        >
          <div>
            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
              "
            >
              Fin
              <span className="text-indigo-400">
                Sphere
              </span>
            </h1>

            <p
              className="
                text-slate-400
                text-sm
                mt-2
              "
            >
              Smart finance analytics platform
            </p>
          </div>

          {/* Mobile Close */}
          <button
            onClick={closeSidebar}
            className="lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="
            flex-1
            px-4
            py-6
            space-y-2
          "
        >
          <NavLink
            to="/"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition-all
              duration-200
              font-medium
              ${
                isActive
                  ? "bg-indigo-500 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }
            `
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition-all
              duration-200
              font-medium
              ${
                isActive
                  ? "bg-indigo-500 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }
            `
            }
          >
            <Receipt size={20} />
            Transactions
          </NavLink>

            <NavLink
              to="/budgets"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition-all
                duration-200
                font-medium
                ${
                  isActive
                    ? "bg-indigo-500 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `
              }
            >
              <Wallet size={20} />
              Budgets
            </NavLink>
          <NavLink
            to="/users"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition-all
              duration-200
              font-medium
              ${
                isActive
                  ? "bg-indigo-500 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }
            `
            }
          >
            <Users size={20} />
            Users
          </NavLink>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-slate-800">
          <div
            className="
              rounded-2xl
              bg-slate-800
              p-4
            "
          >
            <p className="font-semibold text-sm">
              FinSphere Pro
            </p>

            <p
              className="
                text-xs
                text-slate-400
                mt-1
                leading-relaxed
              "
            >
              Manage financial records,
              analytics, budgets and users
              efficiently.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;