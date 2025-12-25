"use client";
import Header from "@/app/components/header/Header";
import Sidebar from "@/app/components/sidebar/Sidebar";

export default function Leave() {
  return (
    <div className="flex h-screen bg-black">
      <div className=" text-white w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <header className="text-white px-4 py-2 flex justify-between items-center">
          <Header mainTitle={"Leave"} greeting={"Good Morning"} />
        </header>
        <main className="p-4 flex-1 overflow-y-auto">
          <h1>haleem</h1>
        </main>
      </div>
    </div>
  );
}
