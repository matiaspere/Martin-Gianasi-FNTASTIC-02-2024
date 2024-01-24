import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export function UploadServiceCard(props) {
  const { register, setIsOpen, errors } = props;
  const handleClick = () => {
    props.handleClick();
    // setIsOpen(false);
  };
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Crear nuevo servicio</CardTitle>
        <CardDescription>
          Ingresá el nombre y el precio del servicio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                placeholder="Nombre del servicio"
                {...register("name", {
                  required: "Debes ingresar un nombre para tu servicio",
                })}
              />
              {errors.name && (
                <span className="text-red-500 font-bold text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Precio</Label>
              <Input
                id="price"
                placeholder="Precio del servicio"
                {...register("price", {
                  required: "Debes ingresar un precio para tu servicio",
                })}
              />
              {errors.price && (
                <span className="text-red-500 font-bold text-xs">
                  {errors.price.message}
                </span>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button onClick={handleClick}>Guardar</Button>
      </CardFooter>
    </Card>
  );
}
