// app/edit/[id]/page.tsx
'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  // Buka params dengan React.use()
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const router = useRouter();

  const [formData, setFormData] = useState({
    albumTitle: '',
    artistName: '',
    rating: 5,
    reviewText: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/reviews/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Gagal fetch');
        return res.json();
      })
      .then((data) => {
        setFormData({
          albumTitle: data.albumTitle,
          artistName: data.artistName,
          rating: data.rating,
          reviewText: data.reviewText
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Data tidak ditemukan atau API error.');
        router.push('/');
      });
  }, [id, router]);

  // Fungsi Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch(`/api/reviews/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Berhasil diupdate! ✅');
      router.push('/');
      router.refresh(); 
    } else {
      alert('Gagal update ❌');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading data...</div>;

  return (
    <div className="container py-5">
      <div className="card shadow-sm col-md-6 mx-auto">
        <div className="card-header bg-warning text-dark">
          <h4 className="mb-0">Edit Ulasan</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label>Judul Album</label>
              <input 
                type="text" className="form-control" required
                value={formData.albumTitle}
                onChange={(e) => setFormData({...formData, albumTitle: e.target.value})} 
              />
            </div>
            <div className="mb-3">
              <label>Nama Artis</label>
              <input 
                type="text" className="form-control" required
                value={formData.artistName}
                onChange={(e) => setFormData({...formData, artistName: e.target.value})} 
              />
            </div>
            <div className="mb-3">
              <label>Rating (1-5)</label>
              <input 
                type="number" className="form-control" min="1" max="5" required
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})} 
              />
            </div>
            <div className="mb-3">
              <label>Ulasan</label>
              <textarea 
                className="form-control" rows={4} required
                value={formData.reviewText}
                onChange={(e) => setFormData({...formData, reviewText: e.target.value})} 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-2">Simpan Perubahan</button>
            <button type="button" onClick={() => router.push('/')} className="btn btn-secondary w-100">Batal</button>
          </form>
        </div>
      </div>
    </div>
  );
}