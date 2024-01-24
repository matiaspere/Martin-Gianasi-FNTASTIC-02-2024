"use client";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { buttonVariants } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { toast } = useToast();

  const router = useRouter();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitted(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res);

    if (res.ok) {
      toast({
        title: "Inicio de sesión exitoso",
      });
      router.push("/dashboard");
      router.refresh();
    } else {
      setFormSubmitted(false);
      toast({
        title: "Email o contraseñas incorrectos",
        variant: "destructive",
      });
    }
  });
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-8  border-gray-300 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Inicia sesión</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            placeholder="ejemplo@gmail.com"
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
            placeholder="*******"
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border rounded-md"
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
        <button
          type="submit"
          disabled={formSubmitted}
          className={buttonVariants({
            size: "sm",
            className: "w-full h-5",
          })}
        >
          Iniciar Sesión
        </button>
        <div className=" mt-4 border-t-2">
          <div className="mt-2 flex justify-between">
          <p>¿No tienes una cuenta?</p>
          <Link href="/auth/signup" className="text-blue-600 font-semibold">
            Crear cuenta
          </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
