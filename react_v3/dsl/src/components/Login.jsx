// src/components/Login.js
"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Logo from "@/components/Logo";

export default function Login() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const router = useRouter();

  /*
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/get/users");
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);
  */

// Fetch user listings from Google Sheets API
useEffect(() => {
    const fetchItems = async () => {
        try {
        const response = await fetch("/api/get/users");
        console.log(response);
        const data = await response.json();
        if (data) {
            setUsers(data);
        } else {
            console.error("Error fetching items:", data.error);
        }
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    fetchItems();
    }, []);

  console.log("\nUsers:\n");
  console.log(users);

  /*
  const handleLogin = () => {
    if (selectedUser) {
      console.log("User Selected!", selectedUser);
      localStorage.setItem("loggedInUser", selectedUser);
      router.push("/user"); // Use Next.js router instead of window.location
    } else {
      console.warn("No user selected!");
    }
  };
*/
    /*
  const handleLogin = () => {
    if (selectedUser) {
      console.log("User Selected!");
      console.log(selectedUser)
      localStorage.setItem("loggedInUser", selectedUser);
      window.location.href = "/user";
    }
  };
  */

  /*
  return (

    <div className="flex flex-col items-center p-5">

      <Logo />
      <br />
      <h1 className="text-2xl font-bold">Login</h1>
      <br />
      <br />
      {/*
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
      }
      <select>
        <option value="">Select a User</option>
        {users.map((user) => (
            <option key={user["Member ID"]} value={user["Member ID"]}>
            {user.Name}
            </option>
        ))}
      </select>
      <br />
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
*/

const handleLogin = () => {
    if (selectedUser) {
      console.log("User Selected:", selectedUser);
      localStorage.setItem("loggedInUser", selectedUser);
      window.location.href = "/items";
    } else {
      console.error("Please select a user before logging in.");
    }
  };

  return (
    <div className="flex flex-col items-center p-5">

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Logo />
        <br />
        <h1 className="text-2xl font-bold">Login</h1>
        <br />
        <br />
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Select a User</option>
        {users.map((user) => (
          <option key={user["Member ID"]} value={user["Member ID"]}>
            {user.Name}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}