import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { ENABLED } from "@/lib/utils";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const businessId = parseInt(searchParams.get("businessId"));

  const businessServices = await prisma.service.findMany({
    where: { businessId },
  });

  return NextResponse.json(businessServices);
}

export async function POST(request) {
  const data = await request.json();
  const { name, price, id } = data;

  const newService = await prisma.service.create({
    data: {
      name: name,
      price: price,
      businessId: id,
      status: true,
    },
  });

  console.log(data, newService);
  return NextResponse.json(newService);
}
