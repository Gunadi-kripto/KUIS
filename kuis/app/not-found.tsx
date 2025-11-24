// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="text-center">
        <div className="display-1 fw-bold text-primary mb-3">
          404 😕
        </div>
        
        <h1 className="h2 fw-bold text-dark mb-2">Halaman Tidak Ditemukan</h1>
        <p className="lead text-muted mb-4">
          Maaf, halaman yang kamu cari sepertinya nyasar atau sudah dihapus.
        </p>

        <Link href="/" className="btn btn-primary btn-lg px-4 shadow-sm">
          &larr; Kembali ke Home
        </Link>
        
        <div className="mt-5 text-muted small">
            Music Explorer App
        </div>
      </div>
    </div>
  );
}