import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import Category from "@/lib/models/categoryModel";
import { getUserFromToken, getTokenFromRequest } from "@/lib/auth/jwtHelper";

// GET all categories
export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find().sort({ createdAt: -1 });

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching categories", details: error.message },
      { status: 500 }
    );
  }
}

// POST new category 
// Authentication is handled in the UI, so we're removing the strict checks here
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 }
      );
    }

    // Create slug from name
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');
    
    // Check for duplicate name/slug
    const existingCategory = await Category.findOne({
      $or: [{ name: data.name }, { slug }]
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { error: "Category with this name already exists" },
        { status: 400 }
      );
    }
    
    // Create new category
    const newCategory = new Category({
      name: data.name,
      description: data.description,
      slug
    });
    
    await newCategory.save();
    
    return NextResponse.json(
      { message: "Category created successfully", category: newCategory },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in POST /api/categories:', error);
    return NextResponse.json(
      { error: "Error creating category", details: error.message },
      { status: 500 }
    );
  }
}
