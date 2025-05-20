import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import Medicine from '@/lib/models/medicineModel';
import { getUserFromToken, getTokenFromRequest } from '@/lib/auth/jwtHelper';
import { isValidObjectId } from 'mongoose';

// GET single medicine by ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  // Destructure params from context, this resolves the async params issue
  const { id } = context.params;
  
  try {
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid medicine ID format' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    const medicine = await Medicine.findById(id).populate('category', 'name');
    
    if (!medicine) {
      return NextResponse.json(
        { error: 'Medicine not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ medicine }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error fetching medicine', details: error.message },
      { status: 500 }
    );
  }
}

// UPDATE medicine by ID (admin only)
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  // Destructure params from context, this resolves the async params issue
  const { id } = context.params;
  
  try {
    // Authentication check
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const user = await getUserFromToken(token);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid medicine ID format' },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.composition || !data.workingMechanism || !data.category) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    
    // Create slug from name
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');
    
    // Check for duplicate name/slug (excluding current medicine)
    const existingMedicine = await Medicine.findOne({
      $or: [{ name: data.name }, { slug }],
      _id: { $ne: id }
    });
    
    if (existingMedicine) {
      return NextResponse.json(
        { error: 'Medicine with this name already exists' },
        { status: 400 }
      );
    }
    
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedMedicine) {
      return NextResponse.json(
        { error: 'Medicine not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Medicine updated successfully', medicine: updatedMedicine },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in PUT /api/medicines/[id]:', error);
    return NextResponse.json(
      { error: 'Error updating medicine', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE medicine by ID (admin only)
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  // Destructure params from context, this resolves the async params issue
  const { id } = context.params;
  
  try {
    // Authentication check
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const user = await getUserFromToken(token);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid medicine ID format' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    const deletedMedicine = await Medicine.findByIdAndDelete(id);
    
    if (!deletedMedicine) {
      return NextResponse.json(
        { error: 'Medicine not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Medicine deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in DELETE /api/medicines/[id]:', error);
    return NextResponse.json(
      { error: 'Error deleting medicine', details: error.message },
      { status: 500 }
    );
  }
}
