"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const [item, setItem] = useState(null);
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId");

  useEffect(() => {
    async function fetchItem() {
      if (itemId) {
        const response = await fetch(`/api/get/checkout?itemId=${itemId}`);
        const data = await response.json();
        setItem(data);
      }
    }
    fetchItem();
  }, [itemId]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Checkout Item</h1>
      <img src={item["Image URL"]} alt={item["Item"]} className="w-40 h-40 object-cover mb-2" />
      <h2 className="text-lg">{item["Item"]}</h2>
      <p>{item["Description"]}</p>
      <p>Variant: {item["Variant"]}</p>
      {item["Restrictions"] && <p className="text-red-500">Restrictions: {item["Restrictions"]}</p>}
      <p>Checkout Date: {new Date().toISOString().split("T")[0]}</p>
      <p>Due Date: {new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0]}</p>
    </div>
  );
}
