// app/api/reviews/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, props: Props) {
  try {
    const params = await props.params; // <--- INI KUNCINYA (AWAIT)
    const id = parseInt(params.id);

    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) return NextResponse.json({ message: 'Tidak ditemukan' }, { status: 404 });

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, props: Props) {
  try {
    const params = await props.params;
    const id = parseInt(params.id);
    const body = await req.json();

    const updated = await prisma.review.update({
      where: { id },
      data: {
        albumTitle: body.albumTitle,
        artistName: body.artistName,
        rating: parseInt(body.rating),
        reviewText: body.reviewText,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal Update' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, props: Props) {
  try {
    const params = await props.params; 
    const id = parseInt(params.id);

    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Berhasil dihapus' });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal Hapus' }, { status: 500 });
  }
}