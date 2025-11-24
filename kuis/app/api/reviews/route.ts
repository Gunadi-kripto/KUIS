// app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 
    
    const newReview = await prisma.review.create({
      data: {
        albumTitle: body.albumTitle,
        artistName: body.artistName,
        rating: parseInt(body.rating), 
        reviewText: body.reviewText,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal simpan', error }, { status: 500 });
  }
}

export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' } 
  });
  return NextResponse.json(reviews);
}