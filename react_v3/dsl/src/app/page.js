import Image from "next/image";
import ItemListing from "../components/ItemListing";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Borrow Items</h1>
      <ItemListing />
    </div>
  );
}