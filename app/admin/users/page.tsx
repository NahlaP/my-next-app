

"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { User } from "@/app/types";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
const token = useSelector((state: RootState) => state.auth.user?.token);

  const [editMode, setEditMode] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});

  const fetchUsers = useCallback(async () => {
    try {
const res = await axios.get("http://localhost:5000/admin/users", {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEditClick = (user: User) => {
    setEditMode(user._id);
    setEditedUser({ name: user.name, email: user.email, role: user.role });
  };

  const handleUpdate = async (userId: string) => {
    try {
      await axios.put(
       `http://localhost:5000/admin/users/${userId}`
,
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditMode(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/admin/users/${userId}`
, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user._id} className="border p-4 rounded shadow-md">
            {editMode === user._id ? (
              <>
                <div className="mb-2">
                  <label className="block font-medium">Name:</label>
                  <input
                    type="text"
                    value={editedUser.name || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, name: e.target.value })
                    }
                    className="border px-2 py-1 w-full rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block font-medium">Email:</label>
                  <input
                    type="email"
                    value={editedUser.email || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                    className="border px-2 py-1 w-full rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className=" font-medium">Role:</label>
                  <select
                    value={editedUser.role || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, role: e.target.value })
                    }
                    className="border px-2 py-1 w-full rounded"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(user._id)}
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(null)}
                    className="bg-gray-500 text-white px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              <p>
  <strong>Role:</strong>{" "}
  <span
    className={`px-2 py-1 rounded text-white text-sm ${
      user.role === "admin"
        ? "bg-blue-600"
        : user.role === "user"
        ? "bg-gray-600"
        : "bg-red-600"
    }`}
  >
    {user.role ? user.role : "unknown"}
  </span>
</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;


