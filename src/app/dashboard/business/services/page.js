"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import Image from "next/image";
import { useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import UploadButton from "@/components/UploadButton";
import { UploadServiceCard } from "@/components/UploadServiceCard";
import { fetchData } from "@/lib/fetchData";
import { useToast } from "@/components/ui/use-toast";
import { Ghost } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/lib/utils";
import { SkeletonLoader } from "@/components/SkeletonLoader";

const Services = () => {
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();

  const userId = session?.user.id;
  const urlWithId = `/api/services?userId=${userId}`;
  const [services, setServices] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState();

  const handleAddService = handleSubmit(async (data) => {
    const newService = {
      name: data.name,
      price: parseInt(data.price),
      id: parseInt(userId),
    };

    try {
      const response = await fetch(`/api/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        fetchData(urlWithId, setServices);
        toast({
          title: "Servicio guardado correctamente",
        });
        setIsOpen(false);
      } else {
        console.error("Failed to create service");
        toast({
          title: "Error al agregar el servicio",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  });

  const handleDeleteService = async (serviceId) => {
    try {
      const response = await fetch(`/api/services?serviceId=${serviceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchData(urlWithId, setServices);
        toast({
          title: "Servicio eliminado correctamente",
        });
        setIsOpen(false);
      } else {
        console.error("Failed to delete service");
        toast({
          title: "Error al eliminar el servicio",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleEditService = async (serviceId, newData) => {
    console.log(serviceId, newData);
    try {
      const response = await fetch(`/api/services?serviceId=${serviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        fetchData(urlWithId, setServices);
        toast({
          title: "Servicio editado correctamente",
        });
        setIsOpen(false);
      } else {
        console.error("Failed to edit service");
        toast({
          title: "Error al editar el servicio",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  React.useEffect(() => {
    if (userId) {
      fetchData(urlWithId, setServices);
      console.log(services);
    }
  }, [session]);

  return (
    <main>
      <MaxWidthWrapper>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="mb-3 font-bold text-5xl text-gray-900">Servicios</h1>
        </div>
        <Card className="md:w-auto mx-auto mt-5">
          <div className="flex justify-between items-center	pr-6">
            <CardHeader>
              <CardTitle>Servicios de mi negocio</CardTitle>
              <CardDescription>
                Podes agregar, editar o eliminar un servicio
              </CardDescription>
            </CardHeader>
            <UploadButton
              ContentComponent={UploadServiceCard}
              userId={userId}
              handleClick={handleAddService}
              register={register}
              errors={errors}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
          {services?.length != 0 || undefined ? (
            <CardContent>
              {!session ? (
                <div className="flex items-center justify-center">
                  <SkeletonLoader />
                </div>
              ) : (
                <Table>
                  <TableCaption>
                    Servicios que actualmente ofrecés en tu negocio.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="md:w-[100px]">Servicio</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead className="text-right">Eliminar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services?.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium w-[200px]">
                          {capitalizeFirstLetter(service.name)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="status"
                              checked={service.status}
                              onCheckedChange={() => {
                                const newChecked = !service.status;
                                setChecked(newChecked);
                                handleEditService(service.id, {
                                  status: newChecked,
                                });
                              }}
                            />
                            <Label htmlFor="status">
                              {service.status ? "Disponible" : "No disponible"}
                            </Label>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(service.price)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-5">
                            <Image
                              className="cursor-pointer"
                              src="/delete.svg"
                              width={20}
                              height={20}
                              onClick={() => handleDeleteService(service.id)}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          ) : (
            <div>
              <Table>
                <TableCaption className="mb-5">
                  <Ghost className="w-10 h-10 mb-5" />
                  Todavía no agregaste ningún servicio
                </TableCaption>
              </Table>
            </div>
          )}
        </Card>
      </MaxWidthWrapper>
    </main>
  );
};

export default Services;
