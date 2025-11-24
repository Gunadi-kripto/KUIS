// app/api/reviews/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fungsi untuk MENGHAPUS data (DELETE)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.review.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Berhasil dihapus' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal menghapus', error }, { status: 500 });
  }
}