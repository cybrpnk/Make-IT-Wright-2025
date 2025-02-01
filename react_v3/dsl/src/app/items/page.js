"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Logo from "@/components/Logo";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const memberId = typeof window !== "undefined" ? localStorage.getItem("loggedInUser") : null;

/*
  useEffect(() => {
    async function fetchItems() {
      const response = await fetch("/api/get/items");
      const data = await response.json();
      setItems(data.items); // Ignore headers
    }
    fetchItems();
  }, []);
  */

    // Fetch item listings from Google Sheets API
    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await fetch("/api/get/items");
            console.log(response);
            const data = await response.json();
            if (data.items) {
              setItems(data.items);
              console.log("Items!");
              console.log(items);
            } else {
              console.error("Error fetching items:", data.error);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

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

  console.log("get your items here")
  console.log(items);

  return (
    <div className="p-5">
        <Logo />
      <h1 className="text-2xl font-medium" style={{ textAlign: 'right' }}>Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
{/*
      {items.map((item, index) => (
          <Card key={index}>
            <CardContent>
              <h2 className="text-lg font-semibold">{item.Item}</h2>
              <p>Available: {item.Available}</p>
              <Button onClick={() => handleRequest(item)}>Request</Button>
            </CardContent>
          </Card>
        ))}

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
*/}
        {items.map((item, index) => (
            <Card key={index} className="shadow-lg rounded-xl">
                <CardContent className="p-4">
                <img 
                    src={item["Image URL"]} 
                    alt={item["Item"]} 
                    className="w-full h-80 object-cover rounded-lg mb-3" 
                />
                <h2 className="text-xl font-semibold">{item["Item"]}</h2>
                <p className="text-gray-700">{item["Owner"]}</p>
                <p className="text-gray-700">{item["Description"]}</p>
                <p className="text-sm text-gray-500">Variant: {item["Variant"]}</p>
                <p className={`mt-2 font-medium ${item["Availability"] === "No" ? "text-red-500" : "text-green-600"}`}>
                    {item["Availability"] === "No" ? `Due Date: ${item["Due Date"]}` : "Available"}
                </p>
                <button 
                    className="mt-3 p-2 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" 
                    onClick={() => requestItem(item["Item ID"])}
                >
                    Request Item
                </button>
                </CardContent>
            </Card>
        ))}


      </div>
    </div>
  );
}
