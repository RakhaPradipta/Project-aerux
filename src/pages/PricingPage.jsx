import { Link } from 'react-router-dom';
import { IoCheckmark } from 'react-icons/io5';
import MainLayout from '../components/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

const plans = [
  {
    n: 'Pratama', p: 'Rp 349rb', u: '/bulan / klinik', d: 'Untuk praktik mandiri & klinik kecil',
    f: ['1 cabang, 3 user', 'RME + antrean + kasir', '50 WA reminder / bulan', 'Laporan dasar', 'Support chat'],
    cta: 'Mulai 14 Hari Gratis',
  },
  {
    n: 'Utama', p: 'Rp 899rb', u: '/bulan / klinik', d: 'Paling dipilih klinik gigi, KIA, kecantikan',
    f: ['1 cabang, 15 user unlimited pasien', 'Semua modul + farmasi + BPJS', '1.000 WA reminder / bulan', 'Bridging SATUSEHAT', 'Laporan owner + fee dokter', 'Training + migrasi gratis'],
    hot: true, cta: 'Jadwalkan Demo',
  },
  {
    n: 'Jaringan', p: 'Custom', u: 'untuk 3+ cabang', d: 'Grup klinik & rumah sakit kecil',
    f: ['Multi-cabang + konsolidasi', 'API + integrasi lab/LIS', 'SLA 99,9% + CSM khusus', 'Onboarding onsite', 'Kontrak tahunan'],
    cta: 'Hubungi Sales',
  },
];

const PricingPage = () => (
  <MainLayout>
    <section className="max-w-7xl mx-auto px-4 sm:px-5 py-14">
      <SectionHeading eyebrow="Harga" title="Harga jujur, tanpa biaya tersembunyi" desc="Semua paket termasuk update, backup, dan support. Batalkan kapan saja." />
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {plans.map((pl) => (
          <Card key={pl.n} hover className={pl.hot ? '!border-primary-800 !shadow-soft-xl md:-translate-y-2' : ''}>
            {pl.hot && <span className="text-[11px] font-bold tracking-[0.18em] uppercase bg-primary-900 text-gold-200 rounded-full px-3 py-1">Paling dipilih</span>}
            <h3 className="font-display text-2xl font-semibold mt-3">{pl.n}</h3>
            <p className="text-sm text-ink-500 mt-1">{pl.d}</p>
            <p className="mt-4"><span className="font-display text-4xl font-semibold">{pl.p}</span><span className="text-sm text-ink-500"> {pl.u}</span></p>
            <ul className="my-6 space-y-2.5">
              {pl.f.map((f) => <li key={f} className="flex gap-2.5 text-[15px] text-ink-700"><IoCheckmark className="text-primary-700 mt-1 shrink-0" />{f}</li>)}
            </ul>
            <Link to="/kontak"><Button variant={pl.hot ? 'primary' : 'outline'} className="w-full">{pl.cta}</Button></Link>
          </Card>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-5 mt-10 text-center">
        {[['Garansi 30 hari', 'Tidak cocok? Uang kembali penuh.'], ['Migrasi gratis', 'Dari Excel / SIM lama, kami yang pindahkan.'], ['Tidak ada setup fee', 'Harga di atas = harga final.']].map(([t, d]) => (
          <div key={t} className="card-elegant p-6"><p className="font-semibold">{t}</p><p className="text-sm text-ink-500 mt-1">{d}</p></div>
        ))}
      </div>
    </section>
  </MainLayout>
);

export default PricingPage;

