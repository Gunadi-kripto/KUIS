// app/explore/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState<any[]>([]); // Menyimpan hasil pencarian
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // Penanda sudah pernah cari atau belum

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setSearched(true);
    setArtists([]);

    try {
      // Fetch ke API Publik TheAudioDB (Key: 123)
      const res = await fetch(`https://www.theaudiodb.com/api/v1/json/123/search.php?s=${query}`);
      const data = await res.json();
      
      // Simpan data artis ke state (jika ada)
      if (data.artists) {
        setArtists(data.artists);
      }
    } catch (error) {
      console.error('Gagal mengambil data:', error);
      alert('Terjadi kesalahan saat mengambil data API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      {/* Header & Navigasi */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="fw-bold">🌍 Jelajahi Musik Dunia</h1>
        <Link href="/" className="btn btn-outline-secondary">
          &larr; Kembali ke Home
        </Link>
      </div>

      {/* Form Pencarian */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-8">
          <div className="card shadow-sm p-4 bg-light border-0">
            <form onSubmit={handleSearch} className="d-flex gap-2">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Cari nama artis (misal: Coldplay, Dewa 19)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? 'Mencari...' : 'Cari'}
              </button>
            </form>
            <small className="text-muted mt-2 text-center">
              Data disediakan oleh TheAudioDB Public API
            </small>
          </div>
        </div>
      </div>

      {/* Hasil Pencarian */}
      <div className="row">
        {loading && <div className="text-center py-5">⏳ Sedang memuat data dari internet...</div>}

        {!loading && searched && artists.length === 0 && (
          <div className="text-center py-5 text-muted">
            ❌ Artis tidak ditemukan. Coba kata kunci lain.
          </div>
        )}

        {artists.map((artist) => (
          <div key={artist.idArtist} className="col-md-4 mb-4">
            <div className="card h-100 shadow border-0 overflow-hidden">
              {/* Gambar Artis */}
              {artist.strArtistThumb ? (
                <img 
                  src={artist.strArtistThumb} 
                  alt={artist.strArtist} 
                  className="card-img-top"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
              ) : (
                <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: '250px' }}>
                  No Image
                </div>
              )}
              
              <div className="card-body">
                <h5 className="card-title fw-bold">{artist.strArtist}</h5>
                <p className="badge bg-info text-dark mb-2">{artist.strGenre || 'Musik'}</p>
                <p className="card-text text-muted small" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                  {artist.strBiographyID || artist.strBiographyEN || 'Tidak ada biografi.'}
                </p>
              </div>
              <div className="card-footer bg-white border-top-0 pb-3">
                <a 
                  href={`https://${artist.strWebsite}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-primary w-100"
                >
                  Lihat Website 🌐
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}