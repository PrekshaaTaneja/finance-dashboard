import { useState } from "react";

import AddUserModal from "@/components/AddUserModal";

import UserTable from "@/components/UserTable";

import { Input } from "@/components/ui/input";

import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/context/AuthContext";
import useDebounce from "@/hooks/useDebounce";

const UsersPage = () => {

  const [refresh, setRefresh] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const debouncedSearch =
    useDebounce(search);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const { user } = useAuth();

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <PageHeader
          title="Users"
          description="Manage user roles and account access."
        />

        {user?.role === "admin" && (
          <AddUserModal
            onSuccess={triggerRefresh}
          />
        )}

      </div>

      <Input
        placeholder="Search users..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="h-12"
      />

      <UserTable
        refresh={refresh}
        search={debouncedSearch}      
      />

    </div>
  );
};

export default UsersPage;