// app/page.tsx
import AddReviewForm from './components/AddReviewForm';
import ReviewList from './components/ReviewList'; 
import Link from 'next/link';

export default function HomePage() {
  const nim = "2104011234"; 
  const nama = "Gunadi Setiawan"; 
  
  return (
    <main className="container py-5">
      <div className="p-5 mb-5 bg-primary text-white rounded-3 shadow-lg bg-gradient">
        <div className="container-fluid py-2">
            <h1 className="display-4 fw-bold">Music Explorer 🎵</h1>
            <p className="lead">Halo, {nama} ({nim})</p>
            <p className="col-md-8 fs-5 opacity-75">
                Aplikasi pencatat ulasan album musik favoritmu.
            </p>

            <div className="mt-4">
                <Link href="/explore" className="btn btn-light text-primary fw-bold px-4 py-2 shadow-sm">
                    🌍 Cari Artis via API &rarr;
                </Link>
            </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark">Mulai Ulas Album</h2>
            <p className="text-muted">Tulis pendapatmu tentang album yang baru didengar.</p>
          </div>
          
          {/* Form Input */}
          <div className="shadow rounded-3 overflow-hidden bg-white mb-5">
             <AddReviewForm />
          </div>

          <hr className="my-5" />

          {/* List Ulasan */}
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark">Daftar Ulasan Saya</h3>
          </div>
          
          <ReviewList />
          
        </div>
      </div>
      
      <footer className="mt-5 text-center text-muted">
        <p>&copy; 2025 {nama}</p>
      </footer>
    </main>
  );
}