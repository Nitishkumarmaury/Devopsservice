import { NextResponse } from "next/server";
import { addReview, getAllReviews } from "@/lib/db/reviews-store";

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function GET() {
  try {
    const reviews = getAllReviews();
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, position, company, rating, quote, project, serviceCategory, industry } = body;

    if (!name || !company || !quote || !rating) {
      return NextResponse.json(
        { success: false, error: "Name, company, rating, and review text are required." },
        { status: 400 }
      );
    }

    const numericRating = Number(rating);
    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json({ success: false, error: "Rating must be between 1 and 5 stars." }, { status: 400 });
    }

    // Capitalize & format fields professionally
    const formattedName = toTitleCase(String(name).trim());
    const formattedCompany = toTitleCase(String(company).trim());
    const formattedPosition = toTitleCase(String(position || "Client Partner").trim());
    const formattedProject = toTitleCase(String(project || "Cloud & Deployment Engagement").trim());
    const formattedQuote = String(quote).trim();

    const validCategory = ["Cloud Infrastructure", "Deployment Services", "Cloud & Deployment"].includes(serviceCategory)
      ? serviceCategory
      : "Cloud & Deployment";

    const created = addReview({
      name: formattedName,
      position: formattedPosition,
      company: formattedCompany,
      rating: numericRating,
      quote: formattedQuote,
      project: formattedProject,
      industry: String(industry || "Software & Technology").trim(),
      serviceCategory: validCategory,
      verified: true,
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    });

    const allReviews = getAllReviews();

    return NextResponse.json({
      success: true,
      message: "Thank you! Your review has been professionally formatted and added live.",
      review: created,
      reviews: allReviews,
    });
  } catch (error) {
    console.error("Failed to save review:", error);
    return NextResponse.json({ success: false, error: "Failed to process review submission." }, { status: 500 });
  }
}
