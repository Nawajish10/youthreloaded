import { NextResponse } from "next/server";
import { z } from "zod";
import { saveLead } from "@/lib/db";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  mobile: z.string().min(10, "Valid mobile number required"),
  email: z.string().optional(),
  age: z.string().min(1, "Age group is required"),
  gender: z.string().min(1, "Gender is required"),
  fitnessGoal: z.string().min(1, "Fitness goal is required"),
  preferredTime: z.string().min(1, "Preferred workout time is required"),
  membershipPlan: z.string().min(1, "Membership plan is required"),
  agreeToTerms: z.boolean(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const record = await saveLead({
      fullName: validatedData.fullName,
      mobile: validatedData.mobile,
      email: validatedData.email || "",
      age: validatedData.age,
      gender: validatedData.gender,
      fitnessGoal: validatedData.fitnessGoal,
      preferredTime: validatedData.preferredTime,
      membershipPlan: validatedData.membershipPlan,
      agreeToTerms: validatedData.agreeToTerms,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        registrationId: record.id,
        record,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Registration API error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Server error processing registration" },
      { status: 500 }
    );
  }
}
