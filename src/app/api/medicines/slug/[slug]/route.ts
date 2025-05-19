import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import Medicine from '@/lib/models/medicineModel';

// GET medicine by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    await dbConnect();
    const medicine = await Medicine.findOne({ slug })
      .populate('category', 'name slug');
    
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