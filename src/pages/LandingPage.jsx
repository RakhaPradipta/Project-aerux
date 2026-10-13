import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoCheckmarkCircle, IoArrowForward, IoShieldCheckmark, IoTime, IoDocumentText, IoMedkit } from 'react-icons/io5';
import MainLayout from '../components/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 texture-grain opacity-60" />
    <div className="absolute -top-32 right-0 w-[320px] h-[320px] md:w-[560px] md:h-[560px] rounded-full bg-primary-100 blur-3xl opacity-70" />
    <div className="absolute top-40 -left-40 w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full bg-gold-100 blur-3xl opacity-70" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-5 pt-10 md:pt-14 pb-14 md:pb-16 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
        <motion.div variants={fadeUp}><span className="eyebrow">Dipercaya 240+ klinik di Indonesia</span></motion.div>
        <motion.h1 variants={fadeUp} className="font-display text-[34px] sm:text-[44px] md:text-[64px] leading-[1.08] font-semibold text-ink-900 mt-5">
          Operasional klinik yang <em className="text-primary-800">tenang</em>, pasien yang <em className="text-gold-600">terurus.</em>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-ink-500 text-[17px] leading-relaxed mt-6 max-w-xl">
          Kirana menyatukan pendaftaran, rekam medis, jadwal dokter, farmasi, kasir, dan laporan — dalam satu layar yang rapi. Tanpa server, tanpa ribet, siap 1 hari.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link to="/dashboard" className="w-full sm:w-auto"><Button size="lg" className="w-full sm:w-auto">Coba Demo Langsung <IoArrowForward /></Button></Link>
          <Link to="/harga" className="w-full sm:w-auto"><Button size="lg" variant="outline" className="w-full sm:w-auto">Lihat Harga</Button></Link>
        </motion.div>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-ink-700">
          {['Gratis migrasi data', 'Terintegrasi SATUSEHAT', 'Tanpa kartu kredit'].map((t) => (
            <span key={t} className="inline-flex items-center gap-2"><IoCheckmarkCircle className="text-primary-700" /> {t}</span>
          ))}
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="card-elegant overflow-hidden shadow-soft-xl">
          <div className="bg-primary-950 text-cream-50 px-6 py-4 flex items-center justify-between">
            <div><p className="text-xs uppercase tracking-[0.2em] text-white/50">Klinik Kirana Menteng</p><p className="font-display text-xl">Jadwal Hari Ini</p></div>
            <span className="text-xs bg-gold-500 text-ink-900 rounded-full px-3 py-1 font-semibold">Live Demo</span>
          </div>
          <div className="divide-y divide-ink-900/8">
            {[
              ['08.30', 'Aisyah Rahma', 'dr. Nadia — Umum', 'Hadir'],
              ['09.00', 'Budi Santoso', 'dr. Hendra — Gigi', 'Menunggu'],
              ['09.30', 'Siti Aminah', 'dr. Nadia — KIA', 'Hadir'],
              ['10.00', 'Dewi Lestari', 'dr. Putri — Kulit', 'Terjadwal'],
            ].map(([jam, pasien, dokter, st]) => (
              <div key={jam + pasien} className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span className="font-display text-base sm:text-lg text-primary-800 w-11 shrink-0">{jam}</span>
                  <div className="min-w-0"><p className="font-medium text-sm sm:text-[15px] truncate">{pasien}</p><p className="text-xs sm:text-[13px] text-ink-500 truncate">{dokter}</p></div>
                </div>
                <span className={`shrink-0 text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-1 ${st === 'Hadir' ? 'bg-primary-100 text-primary-800' : st === 'Menunggu' ? 'bg-gold-100 text-gold-600' : 'bg-ink-900/5 text-ink-500'}`}>{st}</span>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-cream-100 flex justify-between text-sm">
            <span className="text-ink-500">32 pasien hari ini • 4 dokter jaga</span>
            <Link to="/dashboard" className="font-semibold text-primary-800 hover:underline">Buka dashboard →</Link>
          </div>
        </div>
      </motion.div>
    </div>
    <div className="relative border-y border-ink-900/10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-ink-500 text-sm tracking-wide">
        {['KLINIK SEHAT JAYA', 'GRHA MEDIKA', 'SENTRA HUSADA', 'BUNDA KIRANA', 'MITRA KELUARGA'].map((b) => <span key={b} className="font-display text-[15px]">{b}</span>)}
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-5 py-16">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
      {[
        ['240+', 'klinik aktif'],
        ['1,2 jt', 'kunjungan / tahun'],
        ['38%', 'waktu admin terpangkas'],
        ['4,9/5', 'kepuasan pengguna'],
      ].map(([v, l]) => (
        <div key={l} className="text-center py-6 sm:py-8 px-2 card-elegant">
          <p className="font-display text-2xl sm:text-4xl text-primary-900">{v}</p>
          <p className="text-xs sm:text-sm text-ink-500 mt-2">{l}</p>
        </div>
      ))}
    </div>
  </section>
);

const Features = () => {
  const list = [
    { icon: <IoDocumentText />, t: 'Rekam Medis Elektronik', d: 'SOAP, ICD-10, alergi, riwayat, dan resume otomatis. Cari pasien dalam 1 detik.' },
    { icon: <IoTime />, t: 'Jadwal & Antrean Cerdas', d: 'Slot dokter, antrean real-time via layar + WhatsApp. No-show turun 45%.' },
    { icon: <IoMedkit />, t: 'Farmasi & Stok', d: 'Stok menipis otomatis mengingatkan. Resep digital langsung ke kasir.' },
    { icon: <IoShieldCheckmark />, t: 'Kasir, BPJS & Laporan', d: 'Klaim BPJS, kwitansi, dan 20+ laporan keuangan + bridging SATUSEHAT.' },
  ];
  return (
    <section className="bg-white border-y border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-20">
        <SectionHeading eyebrow="Fitur" title="Semua yang klinik butuhkan, tanpa yang membingungkan" desc="Empat modul inti yang dirancang bersama 40 dokter dan perawat — bukan software generik." />
        <div className="grid md:grid-cols-4 gap-5">
          {list.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card hover className="h-full">
                <div className="w-11 h-11 rounded-full bg-primary-900 text-gold-200 flex items-center justify-center text-xl mb-4">{f.icon}</div>
                <h3 className="font-display text-xl font-semibold mb-2">{f.t}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{f.d}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8"><Link to="/fitur" className="font-semibold text-primary-800 hover:underline">Jelajahi semua fitur →</Link></div>
      </div>
    </section>
  );
};

const Workflow = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-5 py-20">
    <SectionHeading eyebrow="Alur kerja" title="Dari pendaftaran ke pulang dalam 4 langkah" />
    <div className="grid md:grid-cols-4 gap-5">
      {[
        ['01', 'Daftar 20 detik', 'Scan QR / NIK. Data terisi otomatis, antrean terkirim ke WA.'],
        ['02', 'Periksa', 'Dokter buka RME + hasil lab sebelumnya dalam satu layar.'],
        ['03', 'Obat & bayar', 'Resep turun ke farmasi, kasir hitung otomatis + QRIS.'],
        ['04', 'Pulang terpantau', 'Resume + pengingat kontrol terkirim. Laporan masuk ke owner.'],
      ].map(([n, t, d]) => (
        <div key={n} className="card-elegant p-6">
          <p className="font-display text-5xl text-gold-500">{n}</p>
          <h3 className="font-semibold text-lg mt-3">{t}</h3>
          <p className="text-sm text-ink-500 mt-2 leading-relaxed">{d}</p>
        </div>
      ))}
    </div>
  </section>
);

const Testimoni = () => (
  <section className="bg-primary-950 text-cream-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-5 py-20">
      <SectionHeading light eyebrow="Testimoni" title="Kata mereka yang sudah beralih" />
      <div className="grid md:grid-cols-3 gap-5">
        {[
          ['“Antrean pagi yang dulu chaos sekarang rapi. Perawat saya hemat 2 jam tiap hari.”', 'dr. Nadia Prameswari', 'Klinik Sehat Jaya, Jakarta'],
          ['“Klaim BPJS yang biasanya 3 hari jadi 1 hari. Audit jadi gampang.”', 'Hendra Wijaya', 'Grha Medika, Surabaya'],
          ['“Tampilannya elegan, orang tua pun bisa pakai. Training cuma 1 sore.”', 'drg. Putri Ayu', 'Sentra Husada, Bandung'],
        ].map(([q, n, k]) => (
          <div key={n} className="bg-white/5 border border-white/10 rounded-2xl p-7">
            <p className="font-display text-lg leading-relaxed">{q}</p>
            <div className="divider-gold my-5" />
            <p className="font-semibold">{n}</p>
            <p className="text-sm text-white/60">{k}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [open, setOpen] = useState(0);
  const faqs = [
    ['Apakah data pasien aman?', 'Ya. Enkripsi AES-256, server di Indonesia, backup harian, dan akses berbasis peran. Kami terdaftar PSE Kominfo dan mendukung bridging SATUSEHAT.'],
    ['Berapa lama implementasi?', 'Rata-rata 1 hari. Tim kami migrasi data Excel/SIM lama Anda gratis, lalu training 2 jam via Zoom atau onsite Jabodetabek.'],
    ['Apakah bisa untuk klinik BPJS?', 'Bisa. Ada modul antrean online, SEP, dan rekap klaim yang sesuai format BPJS Kesehatan.'],
    ['Apakah perlu beli server?', 'Tidak. Kirana 100% cloud. Cukup laptop/HP + printer struk. Mode offline tetap bisa input dan sinkron otomatis.'],
  ];
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-5 py-20">
      <SectionHeading eyebrow="FAQ" title="Pertanyaan yang sering ditanyakan" />
      <div className="space-y-3">
        {faqs.map(([q, a], i) => (
          <div key={i} className="card-elegant overflow-hidden">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full text-left px-6 py-4 font-medium flex justify-between items-center gap-4">
              {q}<span className="text-gold-600 text-xl">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <p className="px-6 pb-5 text-[15px] text-ink-500 leading-relaxed">{a}</p>}
          </div>
        ))}
      </div>
      <div className="mt-14 card-elegant p-8 md:p-10 text-center bg-ink-900 !text-cream-50 !border-ink-900">
        <h3 className="font-display text-3xl font-semibold">Siap merapikan klinik Anda minggu ini?</h3>
        <p className="text-white/60 mt-3">Demo 30 menit bersama konsultan klinik — tanpa komitmen.</p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link to="/kontak"><Button variant="gold" size="lg">Jadwalkan Demo</Button></Link>
          <Link to="/dashboard"><Button size="lg" variant="light">Coba Dashboard Demo</Button></Link>
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => (
  <MainLayout>
    <Hero />
    <Stats />
    <Features />
    <Workflow />
    <Testimoni />
    <FAQ />
  </MainLayout>
);

export default LandingPage;

