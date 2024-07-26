"use client";
import React, { useState } from "react";
import { buttonVariants } from "../../../../components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { BUSINESS } from "@/lib/utils";
import { CONSUMER } from "@/lib/utils";
import { EMPLOYEE } from "@/lib/utils";
import { categories } from "@/lib/categories";

const Signup = ({ params }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();
  const router = useRouter();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [selectedField, setSelectedField] = React.useState("Peluquería");

  console.log(params.role, "ROLLLL");
  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordError(true);
      toast({
        title: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    setPasswordError(false);
    setFormSubmitted(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: params.role,
        category: selectedField,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      toast({
        title: "Cuenta creada correctamente.",
      });
      router.push("/auth/login");
    } else {
      setFormSubmitted(false);
      toast({
        title: "Erorr al crear cuenta",
      });
    }
  });

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-8  border-gray-300 rounded-md">
      {params.role === CONSUMER && (
        <h2 className="text-2xl font-semibold mb-4">Crea tu cuenta</h2>
      )}
      {params.role === BUSINESS && (
        <h2 className="text-2xl font-semibold mb-4">Registrá tu negocio</h2>
      )}
      {params.role === EMPLOYEE && (
        <h2 className="text-2xl font-semibold mb-4">
          Crea tu cuenta de empleado
        </h2>
      )}

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            {params.role === BUSINESS ? "Nombre de tu negocio" : "Nombre"}
          </label>
          <input
            placeholder="Juan Perez"
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("name", {
              required: "El nombre es requerido",
            })}
          />
          {errors.name && (
            <span className="text-red-500 font-bold text-xs">
              {errors.name.message}
            </span>
          )}
        </div>
        {params.role === BUSINESS && (
          <div className="flex flex-col space-y-1.5 mb-4">
            <Label
              htmlFor="framework"
              className="block text-sm font-medium text-gray-600"
            >
              Categoría de tu negocio
            </Label>
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Elige una categoría" />
              </SelectTrigger>
              <SelectContent position="popper">
                {categories.map((category) => (
                  <SelectItem value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            placeholder="juan@gmail.com"
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("email", {
              required: "El email es requerido",
            })}
          />
          {errors.email && (
            <span className="text-red-500 font-bold text-xs">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Contraseña
          </label>
          <input
            placeholder="********"
            type="password"
            id="password"
            name="password"
            className={
              passwordError
                ? "mt-1 p-2 w-full border rounded-md border-red-500"
                : "mt-1 p-2 w-full border rounded-md"
            }
            {...register("password", {
              required: "La contraseña es requerida",
            })}
          />
          {errors.password && (
            <span className="text-red-500 font-bold text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600"
          >
            Repetir Contraseña
          </label>
          <input
            placeholder="********"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={
              passwordError
                ? "mt-1 p-2 w-full border rounded-md border-red-500"
                : "mt-1 p-2 w-full border rounded-md"
            }
            {...register("confirmPassword", {
              required: "La contraseña es requerida",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 font-bold text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Main button */}
        {params.role === CONSUMER && (
          <button
            type="submit"
            disabled={formSubmitted}
            className={buttonVariants({
              size: "sm",
              className: "w-full h-5",
            })}
          >
            Crear cuenta
          </button>
        )}
        {params.role === BUSINESS && (
          <button
            type="submit"
            disabled={formSubmitted}
            className={buttonVariants({
              size: "sm",
              className: "w-full h-5",
            })}
          >
            Registrar negocio
          </button>
        )}
        {params.role === EMPLOYEE && (
          <button
            type="submit"
            disabled={formSubmitted}
            className={buttonVariants({
              size: "sm",
              className: "w-full h-5",
            })}
          >
            Crear cuenta de empleado
          </button>
        )}

        {/* Secondary button */}
        {params.role === CONSUMER && (
          <div className=" mt-3 border-t-2">
            <div className="mt-3 flex justify-between">
              <p>¿Ya tienes una cuenta?</p>
              <Link href="/auth/login" className="text-blue-600 font-semibold">
                Inicia sesión
              </Link>
            </div>
          </div>
        )}
        {params.role === BUSINESS && (
          <div className=" mt-3 border-t-2">
            <Link
              href={`/auth/signup/${EMPLOYEE}`}
              className={buttonVariants({
                size: "sm",
                variant: "outline",
                className: "w-full h-5 mt-3 border-slate-200",
              })}
            >
              Crear cuenta de empleado
            </Link>
          </div>
        )}
        {params.role === EMPLOYEE && (
          <div className=" mt-3 border-t-2">
            <Link
              href={`/auth/signup/${BUSINESS}`}
              type="submit"
              disabled={formSubmitted}
              className={buttonVariants({
                size: "sm",
                variant: "outline",
                className: "w-full h-5 mt-3 border-slate-200",
              })}
            >
              Registrar negocio
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
