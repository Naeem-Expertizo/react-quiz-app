import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center min-h-screen p-2 gap-4">
        <Image src={"/Expertizo-logo.png"} alt="" width={300} height={100} priority style={{ width: "auto", height: 'auto' }} />
        <h1 className="text-4xl font-bold text-center">Welcome to Expertizo Quiz Challenge</h1>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" >
          <Link href={"/quiz"}>Get Started</Link>
        </button>
      </div>

    </React.Fragment>
  );
}
