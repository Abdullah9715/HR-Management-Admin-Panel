"use client";
import { Suspense } from "react";
import EmployeeSidebarProfile from "@/app/components/employeeSidebarProfile/EmployeeSidebarProfile";
import ViewEmployeeSidebar from "@/app/components/viewEmployeeSidebar/ViewEmployeeSidebar";
import ViewLeaveTable from "@/app/components/viewLeaveTable/ViewLeaveTable";
import ViewProjectTable from "@/app/components/viewProjectTable/ViewProjectTable";
import BREAFCASE from "../../assets/icons/briefcase white.svg";
import GMAIL from "../../assets/icons/gmail.svg";
import User from "../../assets/icons/Rectangle 3463328.svg";
import Image from "next/image";
import React from "react";

import IndividualAttendenceTable from "@/app/components/individualAttendenceTable/individualAttendenceTable";
import useViewEmployee from "./useViewEmployee";

function ViewEmployeeContent() {
  const { result, selectedTab, setSelectedTab } = useViewEmployee();

  return (
    <div className="border-[1px]  border-secondry p-5 rounded-lg ">
      <div className="flex flex-row pb-8 border-b-2 border-b-secondry text-white justify-between">
        <div className="flex flex-row">
          {result.imageUrl ? (
            <img
              src={result.imageUrl}
              alt="user"
              width={100}
              height={100}
              className="rounded-lg"
            />
          ) : (
            <Image
              src={User}
              alt="user"
              width={100}
              height={100}
              className="rounded-lg"
            />
          )}
          <div className="space-y-2 text-sm font-light ms-4">
            <h2 className="text-2xl text-white font-semibold">
              {result.userName}
            </h2>
            <h1 className="flex flex-row gap-2.5">
              <Image src={BREAFCASE} alt="breafcase" height={24} width={24} />
              {result.department}
            </h1>
            <h2 className="flex flex-row  gap-2.5">
              <Image height={24} width={24} src={GMAIL} alt="breafcase" />
              {result.email}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex gap-4 flex-row mt-7">
        <ViewEmployeeSidebar selectedTab={setSelectedTab} />
        <div className="w-full">
          {selectedTab === 0 && <EmployeeSidebarProfile id={result.id} />}
          {selectedTab === 1 && <IndividualAttendenceTable id={result.id} />}
          {selectedTab === 2 && <ViewProjectTable id={result.id} />}
          {selectedTab === 3 && <ViewLeaveTable id={result.id} />}
        </div>
      </div>
    </div>
  );
}

export default function ViewEmployee() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewEmployeeContent />
    </Suspense>
  );
}
