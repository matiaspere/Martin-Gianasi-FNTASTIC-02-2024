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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { categories } from "@/lib/categories";

export function BusinessInfoCard(props) {
  const { id, businessInfo } = props;
  const { register, handleSubmit } = useForm();
  const [selectedField, setSelectedField] = React.useState(
    businessInfo?.category
  );
  const [enableButton, setEnableButton] = React.useState(true);
  const { toast } = useToast();

  const submitBusinessInformation = handleSubmit(async (data) => {
    const newBusinessInformation = {
      address: data.address,
      phoneNumber: data.phoneNumber,
      category: selectedField,
      businessId: id,
    };

    try {
      const response = await fetch(`/api/business-information`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBusinessInformation),
      });

      if (response.ok) {
        setEnableButton(!enableButton);
        toast({
          title: "Información guardada correctamente",
        });
      } else {
        console.error("Failed to create order");
        toast({
          title: "Error al actualizar la información",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  });

  return (
    <Card className="w-[350px] md:w-auto">
      <CardHeader>
        <CardTitle>Datos de mi negocio</CardTitle>
        <CardDescription>
          Para editar los datos de tu negocio hacé clic en el botón Editar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Dirección</Label>
              <Input
                disabled={enableButton}
                placeholder={businessInfo?.address}
                {...register("address")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Número de teléfono</Label>
              <Input
                disabled={enableButton}
                placeholder={businessInfo?.phoneNumber}
                {...register("phoneNumber")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Categoría</Label>
              <Select
                value={selectedField}
                onValueChange={setSelectedField}
                disabled={enableButton}
              >
                <SelectTrigger>
                  <SelectValue placeholder={businessInfo?.category} />
                </SelectTrigger>
                <SelectContent position="popper">
                  {categories.map((category, idx) => (
                    <SelectItem key={idx} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={(currentValue) => {
            setEnableButton(!enableButton);
          }}
        >
          Editar
        </Button>
        <Button onClick={submitBusinessInformation}>Guardar</Button>
      </CardFooter>
    </Card>
  );
}
