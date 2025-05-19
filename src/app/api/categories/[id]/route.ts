import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import Category from '@/lib/models/categoryModel';
import { getUserFromToken, getTokenFromRequest } from '@/lib/auth/jwtHelper';
import { isValidObjectId } from 'mongoose';

// GET single category by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid category ID format' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    const category = await Category.findById(id);
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ category }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error fetching category', details: error.message },
      { status: 500 }
    );
  }
}

// UPDATE category by ID (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Authentication check
    const token = getTokenFromRequest(request);
    const user = await getUserFromToken(token);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid category ID format' },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Create slug from name
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');
    
    // Check for duplicate name/slug (excluding current category)
    const existingCategory = await Category.findOne({
      $or: [{ name: data.name }, { slug }],
      _id: { $ne: id }
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 400 }
      );
    }
    
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name: data.name,
        description: data.description,
        slug
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Category updated successfully', category: updatedCategory },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error updating category', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE category by ID (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Authentication check
    const token = getTokenFromRequest(request);
    const user = await getUserFromToken(token);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid category ID format' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    const deletedCategory = await Category.findByIdAndDelete(id);
    
    if (!deletedCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Category deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error deleting category', details: error.message },
      { status: 500 }
    );
  }
}
