"use client";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const memberId = typeof window !== "undefined" ? localStorage.getItem("loggedInUser") : null;

  useEffect(() => {
    async function fetchUser() {
      if (memberId) {
        const response = await fetch(`/api/get/user?memberId=${memberId}`);
        const data = await response.json();
        setUser(data);
      }
    }
    fetchUser();
  }, [memberId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">{user["First Name"]} {user["Last Name"]}</h1>
      <h2 className="text-lg">Consortiums:</h2>
      <p>{user["Consortium IDs"]}</p>
      <h2 className="text-lg">Certifications:</h2>
      <p>{user["Certification IDs"]}</p>
    </div>
  );
}
