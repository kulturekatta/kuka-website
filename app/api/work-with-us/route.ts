import { NextResponse } from "next/server";

// Recruitment is now internal; reject submissions from previously published forms.
export async function POST() {
  return NextResponse.json(
    { success: false, message: "This public application form is no longer available." },
    { status: 410, headers: { "Cache-Control": "no-store" } },
  );
}
