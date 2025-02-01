import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center">
      <Image 
        src="/logo.png" 
        alt="Logo" 
        width={150} 
        height={150} 
        priority
      />
    </div>
  );
}