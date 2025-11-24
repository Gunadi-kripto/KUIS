// app/components/ReviewList.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link'; // Untuk navigasi ke halaman Edit/Detail nanti

// Tipe data sesuai database kita
type Review = {
  id: number;
  albumTitle: string;
  artistName: string;
  rating: number;
  reviewText: string;
};

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil data saat halaman dibuka
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews'); // Panggil API GET yang kita buat awal tadi
      const data = await res.json();
      setReviews(data);
      setLoading(false);
    } catch (error) {
      console.error('Gagal ambil data:', error);
      setLoading(false);
    }
  };

  // Fungsi Hapus Data
  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus ulasan ini?')) {
      await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      fetchReviews(); // Refresh list setelah hapus
    }
  };

  if (loading) return <p className="text-center">Sedang memuat data...</p>;
  if (reviews.length === 0) return <p className="text-center text-muted">Belum ada ulasan. Yuk tambah!</p>;

  return (
    <div className="row mt-4">
      {reviews.map((review) => (
        <div key={review.id} className="col-md-6 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="card-title fw-bold text-primary mb-1">{review.albumTitle}</h5>
                  <h6 className="card-subtitle text-muted mb-2">{review.artistName}</h6>
                </div>
                <span className="badge bg-warning text-dark fs-6">⭐ {review.rating}/5</span>
              </div>
              
              <p className="card-text mt-3 text-secondary">"{review.reviewText}"</p>
              
              <div className="d-flex gap-2 mt-4">
                {/* Tombol Detail (Soal 4a) - Nanti kita buat halamannya */}
                <Link href={`/review/${review.id}`} className="btn btn-sm btn-info text-white">
                  Detail
                </Link>

                {/* Tombol Edit (Soal 3b) - Nanti kita buat halamannya */}
                <Link href={`/edit/${review.id}`} className="btn btn-sm btn-outline-primary">
                  Edit
                </Link>

                {/* Tombol Delete (Soal 3b) - Sudah berfungsi */}
                <button 
                  onClick={() => handleDelete(review.id)} 
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}