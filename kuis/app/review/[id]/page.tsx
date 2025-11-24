// app/review/[id]/page.tsx
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReviewDetailPage({ params }: Props) {
  const resolvedParams = await params; 
  const id = parseInt(resolvedParams.id);

  if (isNaN(id)) return notFound();

  const review = await prisma.review.findUnique({
    where: { id: id },
  });

  if (!review) return notFound();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Link href="/" className="btn btn-outline-secondary mb-4">
            &larr; Kembali ke Home
          </Link>

          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-header bg-info text-white py-3">
              <h2 className="h4 mb-0">Detail Ulasan</h2>
            </div>
            <div className="card-body p-5">
              <h1 className="display-5 fw-bold text-dark mb-2">{review.albumTitle}</h1>
              <h3 className="text-muted mb-4">{review.artistName}</h3>
              <div className="mb-4">
                 <span className="badge bg-warning text-dark fs-5 px-3 py-2 rounded-pill">
                   Rating: {review.rating} / 5 ⭐
                 </span>
              </div>
              <hr />
              <div className="mt-4">
                <h5 className="fw-bold text-secondary">Ulasan Lengkap:</h5>
                <p className="lead" style={{ whiteSpace: 'pre-wrap' }}>{review.reviewText}</p>
              </div>
              <p className="text-muted mt-5 small">
                ID Database: {review.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}