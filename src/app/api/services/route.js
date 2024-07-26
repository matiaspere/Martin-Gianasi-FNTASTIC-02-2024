import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { ENABLED } from "@/lib/utils";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const userId = parseInt(searchParams.get("userId"));

  const business = await prisma.business.findMany({
    where: { userId: userId },
  });

  const businessServices = await prisma.service.findMany({
    where: { businessId: business[0].id },
  });

  console.log(userId, business[0].id, businessServices)
  return NextResponse.json(businessServices);
}

export async function POST(request) {
  const data = await request.json();
  const { name, price, id } = data;

  const business = await prisma.business.findMany({
    where: { userId: id },
  });

  const newService = await prisma.service.create({
    data: {
      name: name,
      price: parseFloat(price),
      businessId: business[0].id,
      status: true,
    },
  });

  return NextResponse.json(newService);
}

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const serviceId = parseInt(searchParams.get("serviceId"));

  const deletedService = await prisma.service.delete({
    where: {
      id: parseInt(serviceId),
    },
  });

  return NextResponse.json(deletedService);
}

export async function PUT(request) {
  const searchParams = request.nextUrl.searchParams;
  const serviceId = parseInt(searchParams.get("serviceId"));
  const data = await request.json();

  const updatedService = await prisma.service.update({
    where: {
      id: serviceId,
    },
    data: {
      ...(data.status !== undefined && { status: data.status }),
      ...(data.name !== undefined && { name: data.name }),
      ...(data.price !== undefined && { price: data.price }),
    },
  });

  return NextResponse.json(updatedService);
}
