"use client";
import { useEffect, useState } from "react";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const memberId = typeof window !== "undefined" ? localStorage.getItem("loggedInUser") : null;

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch("/api/get/items");
      const data = await response.json();
      setItems(data.slice(1)); // Ignore headers
    }
    fetchItems();
  }, []);

  const requestItem = async (itemId) => {
    await fetch("/api/post/requestItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, memberId }),
    });
    alert("Item requested successfully!");
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <img src={item[11]} alt={item[3]} className="w-full h-40 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{item[3]}</h2>
            <p>{item[5]}</p>
            <p>Variant: {item[6]}</p>
            {item[8] === "No" && <p className="text-red-500">Due Date: {item[10]}</p>}
            <button
              className="mt-2 p-2 bg-blue-500 text-white rounded"
              onClick={() => requestItem(item[0])}
            >
              Request Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
