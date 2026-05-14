import { useState } from "react";

import AddUserModal from "@/components/AddUserModal";

import UserTable from "@/components/UserTable";

import { Input } from "@/components/ui/input";

import PageHeader from "@/components/PageHeader";

const UsersPage = () => {

  const [refresh, setRefresh] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <PageHeader
          title="Users"
          description="Manage user roles and account access."
        />

        <AddUserModal
          onSuccess={triggerRefresh}
        />

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
        search={search}
      />

    </div>
  );
};

export default UsersPage;