"use client"
import React from "react";
import { signOut } from "next-auth/react";
import { buttonVariants } from "./ui/button";


const Logout = () => {
  return (
    <>
      <button
      onClick={() => signOut({callbackUrl: '/auth/login'})}
        className={buttonVariants({
          variant: "link",
          size: "sm",
        })}
      >
        Cerrar sesión
      </button>
    </>
  );
};

export default Logout;
