// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css'; // <--- Ini import WAJIB buat Bootstrap
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Music Explorer',
  description: 'Aplikasi Ulasan Musik Mahasiswa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-light"> 
        {children}
      </body>
    </html>
  );
}