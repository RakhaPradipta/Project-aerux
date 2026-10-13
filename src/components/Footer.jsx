import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => (
  <footer className="bg-primary-950 text-cream-50 mt-0">
    <div className="max-w-7xl mx-auto px-5 py-16 grid md:grid-cols-4 gap-10">
      <div>
        <Logo dark />
        <p className="text-white/60 text-sm mt-4 leading-relaxed">Sistem operasi klinik modern — rekam medis, jadwal, farmasi, kasir, dan laporan dalam satu tempat yang tenang dan elegan.</p>
        <p className="text-gold-300 text-xs mt-4 tracking-[0.2em] uppercase">Jakarta • Surabaya • Makassar</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">Produk</p>
        {[
          ['Fitur lengkap', '/fitur'],
          ['Harga', '/harga'],
          ['Demo langsung', '/dashboard'],
          ['Masuk', '/masuk'],
        ].map(([l, to]) => <Link key={l} to={to} className="block py-1.5 text-white/75 hover:text-white text-[15px]">{l}</Link>)}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">Perusahaan</p>
        {[['Tentang kami', '/tentang'], ['Kontak', '/kontak'], ['Keamanan & privasi', '/tentang'], ['Karier', '/tentang']].map(([l, to]) => <Link key={l} to={to} className="block py-1.5 text-white/75 hover:text-white text-[15px]">{l}</Link>)}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">Hubungi kami</p>
        <p className="text-white/75 text-[15px]">halo@kirana.id<br />(021) 5080-2026<br />Senin–Sabtu, 08.00–20.00 WIB</p>
        <Link to="/kontak" className="inline-block mt-4 border border-gold-500/60 text-gold-200 rounded-full px-5 py-2 text-sm hover:bg-gold-500 hover:text-ink-900 transition">Jadwalkan Demo</Link>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col md:flex-row justify-between gap-2 text-[13px] text-white/50">
        <p>© 2026 Kirana by Aerux. Seluruh hak cipta dilindungi.</p>
        <p>Terdaftar PSE Kominfo • Enkripsi AES-256 • Backup harian</p>
      </div>
    </div>
  </footer>
);

export default Footer;
