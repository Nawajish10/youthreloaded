import { NextResponse } from "next/server";
import { getLeads } from "@/lib/db";

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error("Leads API fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching leads" },
      { status: 500 }
    );
  }
}
