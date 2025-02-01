// src/components/Login.js
"use client"
import { useState, useEffect } from "react";

export default function Login() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/get/users");
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const handleLogin = () => {
    if (selectedUser) {
      localStorage.setItem("loggedInUser", selectedUser);
      window.location.href = "/user";
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold">Dummy Login</h1>
      <select
        className="mt-4 p-2 border rounded"
        onChange={(e) => setSelectedUser(e.target.value)}
        value={selectedUser}
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user[9]} value={user[9]}>
            {user[1]} ({user[9]})
          </option>
        ))}
      </select>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}