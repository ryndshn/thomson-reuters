"use client";

import { useState } from "react";
import ATM from "@/components/atm";

export default function Home() {
  return (
    <div className="min-h-screen bg-purple-400 flex items-center justify-center p-4">
      <ATM />
    </div>
  );
}
