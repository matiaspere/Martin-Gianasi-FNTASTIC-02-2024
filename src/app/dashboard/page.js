"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { BusinessInfoCard } from "@/components/BusinessInfoCard";
import { ServiceTable } from "@/components/ServiceTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchServices } from "@/lib/fetchServices";

// https://www.youtube.com/watch?v=l_I9CewUMRg PARA HACER LAS GRAFICAS

const Dashboard = () => {
  const { data: session } = useSession();
  const businessId = session?.user.id;
  const [businessInfo, setBusinessInfo] = useState();
  const [services, setServices] = useState();

  async function getBusinessInfo() {
    const response = await fetch(
      `/api/business-information?userId=${businessId}`
    );
    const data = await response.json();

    setBusinessInfo(data);
  }

  React.useEffect(() => {
    if (session?.user.id) {
      getBusinessInfo();
    }
  }, [session]);

  React.useEffect(() => {
    if (businessId) {
      fetchServices(businessId, setServices);
    }
    console.log(services, "desde dashboardddd");
  }, [session]);

  return (
    <main>
      <MaxWidthWrapper>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="mb-3 font-bold text-5xl text-gray-900">Mi negocio</h1>
        </div>
        <div className="mt-8 flex md:flex-row items-center md:items-start gap-10 flex-col">
          <BusinessInfoCard id={session?.user.id} businessInfo={businessInfo} />
          <div>
            <Card className="w-[350px] md:w-auto lg:w-[600px]">
              <CardHeader>
                <CardTitle>Servicios</CardTitle>
              </CardHeader>
              <CardContent>
                <ServiceTable />
              </CardContent>
            </Card>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default Dashboard;
