"use client";
import { Suspense } from "react";
import PaginationBar from "@/app/components/paginationBar/PaginationBar";
import { FormData } from "../../constants/types";
import TRASH from "../../assets/icons/trash 01.svg";
import EDIT from "../../assets/icons/edit.svg";
import VIEW from "../../assets/icons/view.svg";
import Image from "next/image";
import React from "react";
import useViewDepartment from "./useViewDepartment";
import { EMPLOYEE_TABLE_HEAD } from "./employeeTableHeader";

function ViewDepartmentContent() {
  const {
    currentEmployees,
    currentPage,
    setCurrentPage,
    filteredEmployees,
    itemsPerPage,
    setItemsPerPage,
  } = useViewDepartment();
  return (
    <div className="mt-[30px] shadow-md ">
      <table className="w-full font-light text-sm  text-left rtl:text-right ">
        <thead className="text-[16px] text-[#A2A1A8] font-light">
          <tr>
            {EMPLOYEE_TABLE_HEAD.map((item, i) => {
              return (
                <th
                  scope="col"
                  className="py-[10px] border-b-[1px] border-grayBorder"
                  key={i}
                >
                  {item.heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((data: FormData, i: number) => {
            return (
              <tr className="border-b-[1px] text-white border-secondry" key={i}>
                <td className="pt-[10px]">{data.id}</td>
                <th scope="row" className=" flex items-center pt-[10px] ">
                  <img
                    src={data.imageUrl}
                    height={36}
                    width={36}
                    className="rounded-[18px]"
                    alt="Photo"
                  />
                  <div className="text-[16px] ms-[10px] ">{data.userName}</div>
                </th>
                <td className="pt-[10px]">{data.department}</td>
                <td className="pt-[10px]">{data.designation}</td>
                <td className="pt-[10px]">{data.employeeType}</td>
                <td className="pt-[10px]">
                  <div className=" w-fit text-[12px] bg-[#E253191A] text-customOrange rounded-[4px] px-[9px] py-[3px] font-light">
                    Permanent
                  </div>
                </td>
                <td className="pt-[10px] flex">
                  <button>
                    <Image src={VIEW} alt="iconView" />
                  </button>
                  <button>
                    <Image src={EDIT} alt="iconEdit" />
                  </button>
                  <button>
                    <Image src={TRASH} alt="iconTrash" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <PaginationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={filteredEmployees.length}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewDepartmentContent />
    </Suspense>
  );
}
