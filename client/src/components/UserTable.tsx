import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";

import api from "@/services/api";

import { toast } from "sonner";

import type { User } from "@/types/user";

interface Props {
  refresh: boolean;
  search: string;
}

const UserTable = ({
  refresh,
  search,
}: Props) => {

  const [users, setUsers] =
    useState<User[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchUsers =
    async () => {
      try {
        setLoading(true);

        const res =
          await api.get("/users");

        let filtered =
          res.data.data;

        if (search) {
          filtered =
            filtered.filter(
              (user: User) =>
                user.name
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  )
            );
        }

        setUsers(filtered);

      } catch {
        toast.error(
          "Failed to fetch users"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, [refresh, search]);

  const toggleStatus =
    async (id: string) => {
      try {
        await api.patch(
          `/users/${id}/status`
        );

        toast.success(
          "User updated"
        );

        fetchUsers();

      } catch {
        toast.error(
          "Update failed"
        );
      }
    };

  if (loading) {
    return (
      <div
        className="
          flex
          justify-center
          py-20
        "
      >
        <div
          className="
            w-10
            h-10
            border-4
            border-indigo-500
            border-t-transparent
            rounded-full
            animate-spin
          "
        />
      </div>
    );
  }

  return (
    <div
      className="
        overflow-x-auto
        rounded-3xl
        bg-white/80
        backdrop-blur-xl
        shadow-md
        overflow-hidden
      "
    >
      <Table>

        <TableHeader>
          <TableRow>

            <TableHead>
              Name
            </TableHead>

            <TableHead>
              Email
            </TableHead>

            <TableHead>
              Role
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead>
              Actions
            </TableHead>

          </TableRow>
        </TableHeader>

        <TableBody>

          {users.map((user) => (
            <TableRow
              key={user._id}
            >
              <TableCell className="font-medium">
                {user.name}
              </TableCell>

              <TableCell>
                {user.email}
              </TableCell>

              <TableCell>

                <Badge
                  className="
                    capitalize
                  "
                >
                  {user.role}
                </Badge>

              </TableCell>

              <TableCell>

                <Badge
                  className={
                    user.isActive
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-red-100 text-red-700 hover:bg-red-100"
                  }
                >
                  {user.isActive
                    ? "Active"
                    : "Inactive"}
                </Badge>

              </TableCell>

              <TableCell>

                <button
                  onClick={() =>
                    toggleStatus(
                      user._id
                    )
                  }
                  className="
                    text-sm
                    font-medium
                    text-indigo-600
                    hover:text-indigo-800
                  "
                >
                  Toggle Status
                </button>

              </TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>
    </div>
  );
};

export default UserTable;