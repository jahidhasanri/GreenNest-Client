"use client";

import { deleteUser } from "@/app/lib/API/deleteUser";
import { updateUserRole } from "@/app/lib/API/UpdateUserRole";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role?: "admin" | "user";
}

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users: initialUsers }: UserTableProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);

  // Delete User
  const handleDelete = async () => {
    if (!deleteUserId) return;

    try {
      setDeleting(true);


      await deleteUser(deleteUserId);
      toast.success("User deleted successfully");

      // Remove deleted user from UI
      setUsers((prev) =>
        prev.filter((user) => user._id !== deleteUserId)
      );

      setDeleteUserId(null);
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error("Failed to delete user.");
    } finally {
      setDeleting(false);
    }
  };

  // Update Role
  const handleRoleChange = async (
    userId: string,
    role: "admin" | "user"
  ) => {
    try {
      setUpdatingRole(userId);

    

      await updateUserRole(userId, role);
        toast.success("User role updated successfully");
      

      // Update role locally
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role } : user
        )
      );
    } catch (error) {
      toast.error(`Failed to update user role ${error}`);
    } finally {
      setUpdatingRole(null);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                All Users
              </h2>

              <p className="text-sm text-gray-500">
                {users.length} {users.length === 1 ? "user" : "users"}
              </p>
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-187.5 w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  User
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Role
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* User */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <Image

                            src={user.image}
                            alt={user.name}
                            width={44}
                            height={44}
                            className="h-11 w-11 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
                            {user.name?.charAt(0)?.toUpperCase()}
                          </div>
                        )}

                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            ID: {user._id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {user.email}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <select
                        value={user.role || "user"}
                        disabled={updatingRole === user._id}
                        onChange={(e) =>
                          handleRoleChange(
                            user._id,
                            e.target.value as "admin" | "user"
                          )
                        }
                        className={`rounded-lg border px-3 py-2 text-sm font-medium outline-none transition focus:ring-2 ${
                          user.role === "admin"
                            ? "border-purple-200 bg-purple-50 text-purple-700 focus:ring-purple-200"
                            : "border-blue-200 bg-blue-50 text-blue-700 focus:ring-blue-200"
                        } ${
                          updatingRole === user._id
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    {/* Delete */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setDeleteUserId(user._id)}
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center"
                  >
                    <p className="text-gray-500">
                      No users found.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900">
              Delete User?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete this user? This action
              cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteUserId(null)}
                disabled={deleting}
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                No
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;