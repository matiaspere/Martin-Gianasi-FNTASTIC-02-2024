"use client";
import React from "react";
import { useSession } from "next-auth/react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const WorkingHours = () => {
  const { data: session } = useSession();
  const userRole = session?.user.role;
  const userName = session?.user.name;
  return (
    <main>
      <MaxWidthWrapper>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="mb-3 font-bold text-5xl text-gray-900">Mi negocio</h1>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default WorkingHours;
