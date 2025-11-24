// app/explore/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false); 

  const defaultArtists = [
    "Coldplay", 
    "Dewa 19", 
    "Taylor Swift", 
    "Sheila on 7", 
    "BTS", 
    "Queen", 
    "Tulus",
    "Adele"
  ];

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const promises = defaultArtists.map(name => 
        fetch(`https://www.theaudiodb.com/api/v1/json/123/search.php?s=${name}`).then(res => res.json())
      );

      const results = await Promise.all(promises);

      const combinedArtists: any[] = [];
      results.forEach((data: any) => {
        if (data.artists) {
          combinedArtists.push(data.artists[0]);
        }
      });

      setArtists(combinedArtists);
      setSearched(true);
    } catch (error) {
      console.error('Gagal ambil data awal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setArtists([]); 
    try {
      const res = await fetch(`https://www.theaudiodb.com/api/v1/json/123/search.php?s=${query}`);
      const data = await res.json();
      
      if (data.artists) {
        setArtists(data.artists);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
           <h1 className="fw-bold">🌍 Jelajahi Musik Dunia</h1>
           <p className="text-muted">Temukan artis populer dan legendaris di sini.</p>
        </div>
        <Link href="/" className="btn btn-outline-secondary">
          &larr; Kembali ke Home
        </Link>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-8">
          <div className="card shadow-sm p-4 bg-light border-0">
            <form onSubmit={handleManualSearch} className="d-flex gap-2">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Cari artis spesifik lain..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? '...' : 'Cari'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="row">
        {loading && <div className="text-center py-5"><h4>⏳ Sedang memuat katalog artis...</h4></div>}

        {!loading && artists.length === 0 && (
          <div className="text-center py-5 text-muted">
            ❌ Artis tidak ditemukan.
          </div>
        )}

        {artists.map((artist) => (
          <div key={artist.idArtist} className="col-md-3 mb-4"> 
            <div className="card h-100 shadow-sm border-0 overflow-hidden hover-card">
              <div style={{ height: '200px', overflow: 'hidden' }}>
                {artist.strArtistThumb ? (
                    <img 
                    src={artist.strArtistThumb} 
                    alt={artist.strArtist} 
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center h-100">
                    No Image
                    </div>
                )}
              </div>
              
              <div className="card-body">
                <h5 className="card-title fw-bold text-truncate">{artist.strArtist}</h5>
                <span className="badge bg-dark mb-2">{artist.strGenre || 'Music'}</span>
                <p className="card-text text-secondary small" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                  {artist.strBiographyID || artist.strBiographyEN || 'No Bio'}
                </p>
              </div>
              
              <div className="card-footer bg-white border-top-0 pb-3">
                 <a 
                  href={`https://${artist.strWebsite}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary w-100"
                >
                  Lihat Profil
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}