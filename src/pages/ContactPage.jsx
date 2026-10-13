import { useState } from 'react';
import toast from 'react-hot-toast';
import MainLayout from '../components/MainLayout';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

const ContactPage = () => {
  const [form, setForm] = useState({ nama: '', klinik: '', wa: '', kebutuhan: 'Demo 30 menit', pesan: '' });
  const kirim = (e) => {
    e.preventDefault();
    toast.success(`Terima kasih ${form.nama || 'dok'} — tim kami hubungi via WA maks. 1x24 jam.`);
    setForm({ nama: '', klinik: '', wa: '', kebutuhan: 'Demo 30 menit', pesan: '' });
  };
  return (
    <MainLayout>
      <section className="max-w-7xl mx-auto px-4 sm:px-5 py-14 grid lg:grid-cols-2 gap-10">
        <div>
          <SectionHeading center={false} eyebrow="Kontak" title="Jadwalkan demo, rasakan bedanya" desc="Isi form — konsultan klinik (manusia, bukan bot) akan menghubungi Anda." />
          <div className="space-y-4">
            {[['Kantor Jakarta', 'Jl. Menteng Raya No. 27, Jakarta Pusat'], ['Telepon / WA', '(021) 5080-2026 — Senin–Sabtu 08.00–20.00'], ['Email', 'halo@kirana.id']].map(([t, d]) => (
              <div key={t} className="card-elegant p-5"><p className="text-xs uppercase tracking-[0.2em] text-ink-500">{t}</p><p className="font-medium mt-1">{d}</p></div>
            ))}
          </div>
        </div>
        <form onSubmit={kirim} className="card-elegant p-7 md:p-8 space-y-4 h-fit">
          <div className="grid md:grid-cols-2 gap-4">
            <label className="text-sm">Nama Anda<input required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="dr. Nadia" className="mt-1.5 w-full border border-ink-900/15 rounded-xl px-4 py-3 bg-cream-50 focus:outline-none focus:border-primary-700" /></label>
            <label className="text-sm">No. WA<input required value={form.wa} onChange={(e) => setForm({ ...form, wa: e.target.value })} placeholder="08xx" className="mt-1.5 w-full border border-ink-900/15 rounded-xl px-4 py-3 bg-cream-50 focus:outline-none focus:border-primary-700" /></label>
          </div>
          <label className="text-sm block">Nama klinik<input value={form.klinik} onChange={(e) => setForm({ ...form, klinik: e.target.value })} placeholder="Klinik Sehat Jaya" className="mt-1.5 w-full border border-ink-900/15 rounded-xl px-4 py-3 bg-cream-50 focus:outline-none focus:border-primary-700" /></label>
          <label className="text-sm block">Kebutuhan<select value={form.kebutuhan} onChange={(e) => setForm({ ...form, kebutuhan: e.target.value })} className="mt-1.5 w-full border border-ink-900/15 rounded-xl px-4 py-3 bg-cream-50"><option>Demo 30 menit</option><option>Migrasi data</option><option>Harga jaringan</option><option>Lainnya</option></select></label>
          <label className="text-sm block">Pesan<textarea rows={4} value={form.pesan} onChange={(e) => setForm({ ...form, pesan: e.target.value })} placeholder="Ceritakan jumlah poli, dokter, dan sistem saat ini..." className="mt-1.5 w-full border border-ink-900/15 rounded-xl px-4 py-3 bg-cream-50 focus:outline-none focus:border-primary-700" /></label>
          <Button className="w-full" size="lg">Kirim Permintaan Demo</Button>
          <p className="text-xs text-ink-500 text-center">Dengan mengirim, Anda setuju dihubungi via WA/telepon.</p>
        </form>
      </section>
    </MainLayout>
  );
};

export default ContactPage;

