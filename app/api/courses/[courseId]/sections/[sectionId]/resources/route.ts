import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  {
    params,
  }: { params: { courseId: string; sectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");

    const { courseId, sectionId } = params;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        instructorId: userId,
      },
    });
    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
        courseId,
      },
    });

    if (!section) {
      return new NextResponse("Section Not Found", { status: 404 });
    }

    const { name, fileUrl } = await req.json();
    const resource = await db.resource.create({
      data: {
        name,
        fileUrl,
        sectionId,
      },
    });
    return NextResponse.json(resource, { status: 200 });
  } catch (err) {
    console.log("resource_POST", err);
  }
};
