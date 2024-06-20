import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

//original code
import prisma from "@prisma/client";

// new code
// import { PrismaClient } from "@prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  notes: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    // check prisma object
    // console.log("Prisma instance:", prisma);

    // check data
    console.log("title: ", body.title);
    console.log("description: ", body.description);
    console.log("notes: ", body.notes);

    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
        notes: body.notes,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error("Error creating issue:", error);
    return NextResponse.json(
      { error: "Failed to create issue" },
      { status: 500 }
    );
  }
}