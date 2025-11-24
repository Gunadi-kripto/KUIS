// app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Fungsi untuk MENYIMPAN data (POST)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Ambil data yang dikirim user
    
    // Simpan ke database
    const newReview = await prisma.review.create({
      data: {
        albumTitle: body.albumTitle,
        artistName: body.artistName,
        rating: parseInt(body.rating), // Pastikan rating jadi angka
        reviewText: body.reviewText,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal simpan', error }, { status: 500 });
  }
}

// 2. Fungsi untuk MENGAMBIL data (GET)
export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' } // Urutkan dari yang terbaru
  });
  return NextResponse.json(reviews);
}