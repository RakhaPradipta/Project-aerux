import { motion } from 'framer-motion';
import MainLayout from '../components/MainLayout';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';

const groups = [
  {
    t: 'Pelayanan Pasien', items: [
      ['Pendaftaran QR + NIK', 'Cek-in 20 detik, Discharge summary otomatis.'],
      ['Antrean real-time', 'Layar + WhatsApp + estimasi tunggu.'],
      ['Pengingat kontrol', 'WA otomatis H-1, no-show turun 45%.'],
      ['Survei kepuasan', 'Rating tiap kunjungan,.owner dapat ringkasan.'],
    ],
  },
  {
    t: 'Klinis', items: [
      ['RME + ICD-10', 'Template SOAP per poli, favorit obat dokter.'],
      ['Lab & radiologi', 'Order, hasil, dan grafik tren dalam RME.'],
      ['Alergi & kontraindikasi', 'Peringatan otomatis saat meresepkan.'],
      ['Resume medis 1-klik', 'Surat rujukan, SKD, dan kontrol.'],
    ],
  },
  {
    t: 'Operasional', items: [
      ['Jadwal dokter & shift', 'Tukar shift, cuti, dan fee sharing.'],
      ['Farmasi & gudang', 'Stok minimum alert, kartu stok, ED tracking.'],
      ['Kasir & QRIS', 'Split bill, deposit, piutang, tutup kasir.'],
      ['BPJS & asuransi', 'SEP, rujukan, dan rekap klaim.'],
    ],
  },
  {
    t: 'Manajemen', items: [
      ['20+ laporan', 'Kunjungan, revenue per poli/dokter, obat terlaris.'],
      ['Multi-cabang', 'Bandinkan kinerja antar cabang real-time.'],
      ['Hak akses peran', 'Owner, dokter, perawat, kasir, apoteker.'],
      ['SATUSEHAT bridging', 'Kirim encounter, condition, medication.'],
    ],
  },
];

const FeaturesPage = () => (
  <MainLayout>
    <section className="max-w-7xl mx-auto px-4 sm:px-5 py-14">
      <SectionHeading eyebrow="Fitur" title="Lengkap untuk klinik, sederhana untuk tim" desc="Semua modul terhubung — data diinput sekali, mengalir ke mana-mana." />
      {groups.map((g, gi) => (
        <div key={gi} className="mb-12">
          <h3 className="font-display text-2xl font-semibold mb-5 flex items-center gap-3"><span className="w-8 h-px bg-gold-500 block" />{g.t}</h3>
          <div className="grid md:grid-cols-4 gap-5">
            {g.items.map(([t, d], i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card hover className="h-full"><h4 className="font-semibold mb-1.5">{t}</h4><p className="text-sm text-ink-500 leading-relaxed">{d}</p></Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      <div className="card-elegant p-8 grid md:grid-cols-3 gap-6 text-center">
        {[['Tanpa server', 'Cloud + mode offline'], ['SATUSEHAT ready', 'Bridging tersertifikasi'], ['Audit trail', 'Setiap ubah tercatat']].map(([t, d]) => (
          <div key={t}><p className="font-display text-xl font-semibold">{t}</p><p className="text-sm text-ink-500 mt-1">{d}</p></div>
        ))}
      </div>
    </section>
  </MainLayout>
);

export default FeaturesPage;

