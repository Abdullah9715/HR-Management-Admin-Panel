"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function useViewEmployee() {
  const [selectedTab, setSelectedTab] = useState(0);
  const searchparams = useSearchParams();
  const employee = searchparams.get("user");
  const result = JSON.parse(employee as string);
  return {
    result,
    selectedTab,
    setSelectedTab,
  };
}
