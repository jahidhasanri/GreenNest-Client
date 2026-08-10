import { getUsers } from "@/app/lib/API/getUsers";
import React from "react";
import UserTable from "../UsersTble/UserTable";


const Page = async () => {
  const users = await getUsers();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Manage Users
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View, update roles and delete users.
          </p>
        </div>

        {/* User Table */}
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default Page;