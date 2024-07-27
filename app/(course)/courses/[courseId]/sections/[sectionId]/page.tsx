import SectionDetails from "@/components/sections/SectionDetails";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Resource } from "@prisma/client";
import { redirect } from "next/navigation";

const SectionDetailsPage = async ({
  params,
}: {
  params: { courseId: string; sectionId: string };
}) => {
  const { courseId, sectionId } = params;
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
      },
    },
  });

  if (!course || !course.isPublished) {
    return redirect("/");
  }

  const section = await db.section.findUnique({
    where: {
      id: sectionId,
      courseId: courseId,
    },
  });

  if (!section || !section.isPublished) {
    return redirect(`/courses/${courseId}/overview`);
  }

  const purchase = await db.purchase.findUnique({
    where: {
      customerId_courseId: {
        customerId: userId,
        courseId: courseId,
      },
    },
  });

  let muxData = null;
  let resources: Resource[] = [];

  if (section.isFree || purchase) {
    muxData = await db.muxData.findUnique({
      where: {
        sectionId: sectionId,
      },
    });
  }

  if (purchase) {
    resources = await db.resource.findMany({
      where: {
        sectionId: sectionId,
      },
    });
  }

  const progress = await db.progress.findUnique({
    where: {
      studentId_sectionId: {
        studentId: userId,
        sectionId: sectionId,
      },
    },
  });

  // Ensure course has the necessary fields as per the SectionDetailsProps type
  const courseWithSections = {
    ...course,
    sections: course.sections.map((sec) => ({
      id: sec.id,
      title: sec.title,
      description: sec.description,
      videoUrl: sec.videoUrl,
      position: sec.position,
      isPublished: sec.isPublished,
      isFree: sec.isFree,
      courseId: sec.courseId,
      createdAt: sec.createdAt,
      updatedAt: sec.updatedAt,
    })),
  };

  return (
    <SectionDetails
      course={courseWithSections}
      section={section}
      muxData={muxData}
      purchase={purchase}
      resources={resources}
      progress={progress}
    />
  );
};

export default SectionDetailsPage;
