"use client";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {

  const router = useRouter();

  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center min-h-screen p-2 gap-4">
        <Image src={"/Expertizo-logo.png"} alt="" width={300} height={100} priority style={{ width: "auto", height: 'auto' }} />
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to Expertizo Quiz Challenge</h1>
        <Button title="Get Started" onClick={() => router.push("/quiz")} />
      </div>

    </React.Fragment>
  );
}
