"use client";
import React, { useState, useEffect } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/storeHook";
import { updateEmployee } from "@/redux/slices/employee";
import ViewEmployeeSidebar from "@/app/components/viewEmployeeSidebar/ViewEmployeeSidebar";
import ViewLeaveTable from "@/app/components/viewLeaveTable/ViewLeaveTable";
import ViewProjectTable from "@/app/components/viewProjectTable/ViewProjectTable";
import BREAFCASE from "../../assets/icons/briefcase white.svg";
import GMAIL from "../../assets/icons/gmail.svg";
import EDIT from "../../assets/icons/edit.svg";
import User from "../../assets/icons/Rectangle 3463328.svg";
import Image from "next/image";
import IndividualAttendenceTable from "@/app/components/individualAttendenceTable/individualAttendenceTable";
import EditSidebarProfile from "@/app/components/employeeSidebarProfile/EditSidebarProfile";
import toast from "react-hot-toast";
import Loader from "@/app/components/loader/Loader";

interface Data {
  id: string;
}

function SuspenseLoader() {
  return <Loader />;
}

function EditEmployeeContent() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [formData, setFormData] = useState<Data>({ id: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const searchparams = useSearchParams();
  const employee = searchparams.get("user");
  const result = employee ? JSON.parse(employee) : null;

  useEffect(() => {
    if (result) {
      setFormData({ id: result.id });
    }
  }, [result]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const id = formData.id;
      await dispatch(updateEmployee({ id: id, data: formData }));
      toast.success("Employee updated successfully");
    } catch (error) {
      toast.error("Error updating employee:" + error);
      console.error("Error updating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!result) {
    return <Loader />;
  }

  return (
    <div className="border-[1px] border-secondry p-5 rounded-lg ">
      <div className="flex flex-row pb-8 border-b-2 border-b-secondry text-white justify-between">
        <div className="flex flex-row">
          <Image
            src={User}
            alt="user"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <div className="space-y-2 text-sm font-light ms-4">
            <h2 className="text-2xl text-white font-semibold">
              {result.userName}
            </h2>
            <h1 className="flex flex-row gap-2.5">
              <Image src={BREAFCASE} alt="breafcase" height={24} width={24} />
              {result.department}
            </h1>
            <h2 className="flex flex-row  gap-2.5">
              <Image src={GMAIL} alt="breafcase" height={24} width={24} />
              {result.email}
            </h2>
          </div>
        </div>
        <div className="mt-auto">
          <button
            onClick={handleUpdate}
            className="border-[1px] flex bg-primary flex-row items-center justify-center gap-3 rounded-lg text-white border-secondry p-2"
          >
            {loading ? (
              <Loader />
            ) : (
              <>
                <Image src={EDIT} alt="filter" />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>
      <div className="flex gap-4 flex-row mt-7">
        <ViewEmployeeSidebar selectedTab={setSelectedTab} />
        <div className="w-full">
          <Suspense fallback={<SuspenseLoader />}>
            {selectedTab === 0 && (
              <EditSidebarProfile id={result.id} setFormData={setFormData} />
            )}
            {selectedTab === 1 && <IndividualAttendenceTable id={result.id} />}
            {selectedTab === 2 && <ViewProjectTable id={result.id} />}
            {selectedTab === 3 && <ViewLeaveTable id={result.id} />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default function EditEmployee() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditEmployeeContent />
    </Suspense>
  );
}
