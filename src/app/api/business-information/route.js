import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(request) {
  const data = await request.json();
  const { address, phoneNumber, category, businessId } = data;
  const businessIdParsed = parseInt(businessId);

  try {
    const updatedBusinessInfoData = {
      ...(address !== (undefined || "") && { address }),
      ...(category !== (undefined || "") && { category }),
      ...(phoneNumber !== (undefined || "") && { phoneNumber }),
    };

    const updatedBusinessInfo = await prisma.businessInfo.update({
      where: { id: businessIdParsed },
      data: updatedBusinessInfoData,
    });

    return NextResponse.json(updatedBusinessInfo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error al actualizar la información del negocio",
    });
  }
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const userId = parseInt(searchParams.get("userId"));

  const userBusinessInfo = await prisma.businessInfo.findUnique({
    where: { id: userId },
  });

  return NextResponse.json(userBusinessInfo);
}
