import { NextResponse } from "next/server";
import { addReview, getAllReviews } from "@/lib/db/reviews-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const responseHeaders = { "Cache-Control": "no-store, max-age=0" };
const serviceCategories = ["Cloud Infrastructure", "Deployment Services", "Cloud & Deployment"] as const;

function asTrimmedText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asSingleLineText(value: unknown) {
  return asTrimmedText(value).replace(/\s+/g, " ");
}

function errorResponse(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status, headers: responseHeaders });
}

export async function GET() {
  try {
    const reviews = await getAllReviews();
    return NextResponse.json({ success: true, reviews }, { headers: responseHeaders });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return errorResponse("Reviews are temporarily unavailable.", 503);
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return errorResponse("Please send a valid review.", 400);
    }
    const review = body as Record<string, unknown>;
    const name = asSingleLineText(review.name);
    const position = asSingleLineText(review.position);
    const company = asSingleLineText(review.company);
    const project = asSingleLineText(review.project);
    const quote = asTrimmedText(review.quote);
    const industry = asSingleLineText(review.industry);
    const rating = Number(review.rating);
    const serviceCategory = review.serviceCategory;

    if (!name || !company || !quote || !rating) {
      return errorResponse("Name, company, rating, and review text are required.", 400);
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return errorResponse("Rating must be between 1 and 5 stars.", 400);
    }

    if (name.length > 100 || company.length > 120 || position.length > 120 || project.length > 160 || quote.length > 5000) {
      return errorResponse("Please keep names and project details under 160 characters and the review under 5,000 characters.", 400);
    }

    const validCategory: (typeof serviceCategories)[number] = serviceCategories.includes(serviceCategory as (typeof serviceCategories)[number])
      ? (serviceCategory as (typeof serviceCategories)[number])
      : "Cloud & Deployment";

    const created = await addReview({
      name,
      position: position || "Client Partner",
      company,
      rating,
      quote,
      project: project || "Cloud & Deployment Engagement",
      industry: industry || "Software & Technology",
      serviceCategory: validCategory,
      verified: true,
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    });

    const allReviews = await getAllReviews();

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your review has been submitted and published live.",
        review: created,
        reviews: allReviews,
      },
      { headers: responseHeaders }
    );
  } catch (error) {
    console.error("Failed to save review:", error);
    return errorResponse("We could not save your review. Please try again shortly.", 503);
  }
}
