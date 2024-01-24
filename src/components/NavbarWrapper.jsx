import React from "react";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavbarContent from "./NavbarContent";

export default async function NavbarWrapper() {
  const session = await getServerSession(authOptions);
  const userRole = session?.user.role;
  const userName = session?.user.name;

  return (
    <NavbarContent session={session}/>
  );
}
