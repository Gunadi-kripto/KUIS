// app/components/AddReviewForm.tsx
'use client'; // Wajib karena kita pakai useState (interaksi user)

import { useState } from 'react';

export default function AddReviewForm() {
  const [albumTitle, setAlbumTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Loading...');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ albumTitle, artistName, rating, reviewText }),
      });

      if (res.ok) {
        setStatus('Berhasil disimpan! ✅');
        // Reset form
        setAlbumTitle('');
        setArtistName('');
        setReviewText('');
        // Refresh halaman agar data baru muncul (opsional)
        window.location.reload();
      } else {
        setStatus('Gagal menyimpan ❌');
      }
    } catch (error) {
      console.error(error);
      setStatus('Terjadi kesalahan error');
    }
  };

  return (
    <div className="card mt-4 mb-4">
      <div className="card-header bg-primary text-white">
        Tambah Ulasan Baru
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Judul Album</label>
            <input 
              type="text" 
              className="form-control" 
              value={albumTitle}
              onChange={(e) => setAlbumTitle(e.target.value)}
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nama Artis</label>
            <input 
              type="text" 
              className="form-control" 
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rating (1-5)</label>
            <input 
              type="number" 
              className="form-control" 
              min="1" 
              max="5"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ulasan Kamu</label>
            <textarea 
              className="form-control" 
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success">Simpan Ulasan</button>
          
          {status && <p className="mt-2 text-info">{status}</p>}
        </form>
      </div>
    </div>
  );
}