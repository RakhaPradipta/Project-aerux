import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Logo from '../components/Logo';
import Button from '../components/Button';

const LoginPage = () => {
  const [form, setForm] = useState({ email: 'demo@kirana.id', pass: 'demo123' });
  const nav = useNavigate();
  const masuk = (e) => {
    e.preventDefault();
    toast.success('Selamat datang kembali di Kirana.');
    nav('/dashboard');
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-cream-50">
      <div className="hidden lg:flex flex-col justify-between bg-primary-950 text-cream-50 p-12">
        <Logo dark />
        <div>
          <p className="font-display text-4xl leading-tight">“Pagi yang tadinya chaos, sekarang <em className="text-gold-300">tenang.</em>”</p>
          <p className="text-white/60 mt-4">dr. Nadia — Klinik Sehat Jaya, pengguna sejak 2024</p>
        </div>
        <p className="text-white/40 text-sm">Enkripsi AES-256 • Server Indonesia • Backup harian</p>
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <form onSubmit={masuk} className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo /></div>
          <p className="eyebrow">Masuk</p>
          <h1 className="font-display text-4xl font-semibold mt-3">Selamat datang kembali</h1>
          <p className="text-ink-500 mt-2 text-[15px]">Gunakan akun demo — langsung masuk dashboard.</p>
          <label className="block text-sm mt-8">Email kerja<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 w-full border border-ink-900/15 rounded-xl px-4 py-3 bg-white" /></label>
          <label className="block text-sm mt-4">Kata sandi<input type="password" value={form.pass} onChange={(e) => setForm({ ...form, pass: e.target.value })} className="mt-1.5 w-full border border-ink-900/15 rounded-xl px-4 py-3 bg-white" /></label>
          <Button className="w-full mt-6" size="lg">Masuk ke Dashboard</Button>
          <p className="text-sm text-ink-500 text-center mt-5">Belum punya akun? <Link to="/kontak" className="font-semibold text-primary-800 hover:underline">Minta akses demo</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

