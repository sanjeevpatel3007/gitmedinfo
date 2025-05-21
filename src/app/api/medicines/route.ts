import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import Medicine from "@/lib/models/medicineModel";

// GET all medicines with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    const skip = (page - 1) * limit;
    
    await dbConnect();
    
    // Build query
    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { composition: { $regex: search, $options: 'i' } }
      ];
    }
    
    const total = await Medicine.countDocuments(query);
    const medicines = await Medicine.find(query)
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    return NextResponse.json({
      medicines,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching medicines", details: error.message },
      { status: 500 }
    );
  }
}

// POST new medicine (no authentication required in API)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.composition || !data.workingMechanism || !data.category) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Create slug from name
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');
    
    // Check for duplicate name/slug
    const existingMedicine = await Medicine.findOne({
      $or: [{ name: data.name }, { slug }]
    });
    
    if (existingMedicine) {
      return NextResponse.json(
        { error: "Medicine with this name already exists" },
        { status: 400 }
      );
    }
    
    // Create new medicine
    const newMedicine = new Medicine({
      name: data.name,
      slug,
      composition: data.composition,
      dosage: data.dosage || [],
      uses: data.uses || [],
      sideEffects: data.sideEffects || [],
      workingMechanism: data.workingMechanism,
      warnings: data.warnings || [],
      category: data.category,
      images: data.images || []
    });
    
    await newMedicine.save();
    
    return NextResponse.json(
      { message: "Medicine created successfully", medicine: newMedicine },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error creating medicine", details: error.message },
      { status: 500 }
    );
  }
}
