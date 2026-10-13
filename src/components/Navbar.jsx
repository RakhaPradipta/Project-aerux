import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMenu, IoClose } from 'react-icons/io5';
import Logo from './Logo';

const links = [
  { label: 'Beranda', to: '/' },
  { label: 'Fitur', to: '/fitur' },
  { label: 'Harga', to: '/harga' },
  { label: 'Tentang', to: '/tentang' },
  { label: 'Kontak', to: '/kontak' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="bg-primary-950 text-cream-50 text-center text-[11.5px] sm:text-[12.5px] leading-snug py-2 px-4 tracking-wide">
        Terintegrasi SATUSEHAT Kemenkes — migrasi data gratis untuk 20 klinik pertama bulan ini
      </div>
      <nav className="bg-cream-50/90 backdrop-blur-md border-b border-ink-900/10">
        <div className="max-w-7xl mx-auto px-5 h-[72px] flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={`text-[15px] ${loc.pathname === l.to ? 'text-ink-900 font-semibold' : 'text-ink-500 hover:text-ink-900'}`}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/masuk" className="text-[15px] text-ink-700 hover:text-ink-900 font-medium px-4 py-2">Masuk</Link>
            <Link to="/dashboard" className="btn-elegant bg-ink-900 text-white px-6 py-2.5 text-[15px] hover:bg-black">Lihat Demo</Link>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-ink-900">{open ? <IoClose size={24} /> : <IoMenu size={24} />}</button>
        </div>
        {open && (
          <div className="md:hidden border-t border-ink-900/10 bg-cream-50 px-5 py-4 space-y-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-2.5 text-ink-700">{l.label}</Link>
            ))}
            <div className="flex gap-3 pt-3">
              <Link to="/masuk" onClick={() => setOpen(false)} className="flex-1 text-center border border-ink-900/20 rounded-full py-2.5">Masuk</Link>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="flex-1 text-center bg-ink-900 text-white rounded-full py-2.5">Lihat Demo</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
