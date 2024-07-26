"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { BusinessInfoCard } from "@/components/BusinessInfoCard";
import { ServiceTable } from "@/components/ServiceTable";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/lib/utils";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { fetchData } from "@/lib/fetchData";

// https://www.youtube.com/watch?v=l_I9CewUMRg PARA HACER LAS GRAFICAS

const Dashboard = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const urlWithId = `/api/services?userId=${userId}`;
  const [businessInfo, setBusinessInfo] = useState();
  const [services, setServices] = useState();

  async function getBusinessInfo() {
    const response = await fetch(
      `/api/business-information?userId=${userId}`
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
    if (userId) {
      fetchData(urlWithId, setServices);
    }
  }, [session]);

  return (
    <main>
      <MaxWidthWrapper>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="mb-3 font-bold text-5xl text-gray-900">Mi negocio</h1>
        </div>
        <div className="mt-8 justify-around flex sm:flex-row items-center md:items-start gap-10 flex-col">
          <Card className="w-[240px] h-[150px]">
            <CardHeader>
              <p className="font-bold">Reservas totales:</p>
              <CardTitle>18</CardTitle>
              <CardDescription>En el transcurso de este mes</CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-[260px] h-[150px]">
            <CardHeader>
              <p className="font-bold">Reservas pendientes:</p>
              <CardTitle>3</CardTitle>
              <CardDescription>En el transcurso de esta semana</CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-[260px] h-[150px]">
            <CardHeader>
              <p className="font-bold">Ventas totales:</p>
              <CardTitle>$23.450</CardTitle>
              <CardDescription>En el transcurso de este mes</CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-[260px] h-[150px]">
            <CardHeader>
              <p className="font-bold">Nuevos clientes:</p>
              <CardTitle>5</CardTitle>
              <CardDescription>Desde tu registro</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="mt-8 flex sm:flex-row items-center md:items-start gap-10 flex-col">
          <BusinessInfoCard id={session?.user.id} businessInfo={businessInfo} />
          <div>
            <Card className=" md:w-auto lg:w-[600px]">
              <CardHeader>
                <CardTitle>Servicios</CardTitle>
              </CardHeader>
              {/* aca arranca la table */}
              <CardContent>
                <Table>
                  <TableCaption>
                    Servicios que actualmente ofrecés en tu negocio.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="md:w-[100px]">Servicio</TableHead>
                      <TableHead>Precio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services?.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium w-[200px]">
                          {capitalizeFirstLetter(service.name)}
                        </TableCell>
                        <TableCell>{formatCurrency(service.price)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default Dashboard;
