import MainLayout from '../components/MainLayout';
import SectionHeading from '../components/SectionHeading';

const AboutPage = () => (
  <MainLayout>
    <section className="max-w-4xl mx-auto px-4 sm:px-5 py-14">
      <SectionHeading eyebrow="Tentang" title="Dibangun bersama klinik, bukan di menara gading" desc="Kirana lahir 2023 dari tim yang 6 bulan magang di klinik — mencatat antrean pakai stopwatch." />
      <div className="card-elegant p-8 md:p-10 leading-relaxed text-[16px] text-ink-700 space-y-4">
        <p>Kami percaya software kesehatan harus <b>tenang</b>: tidak berisik, tidak menakuti perawat senior, dan tidak down saat pasien ramai. Karena itu setiap layar Kirana diuji ke 3 kriteria — bisa dipakai satu tangan, terbaca dari 1 meter, dan selesai dalam 3 klik.</p>
        <p>Hari ini 240+ klinik memakai Kirana setiap hari. Misi kami sederhana: <b>kembalikan 2 jam kerja admin</b> ke setiap tenaga kesehatan, agar kembali ke pasien.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {[['Tenang', 'Sedikit notifikasi, banyak kejelasan.'], ['Teliti', 'Setiap rupiah dan pil tercatat.'], ['Tulus', 'Support manusia, bukan bot.']].map(([t, d]) => (
          <div key={t} className="card-elegant p-6 text-center"><p className="font-display text-2xl font-semibold">{t}</p><p className="text-sm text-ink-500 mt-2">{d}</p></div>
        ))}
      </div>
      <div className="mt-8 card-elegant p-8">
        <p className="eyebrow">Perjalanan</p>
        <div className="mt-4 space-y-4">
          {[['2023', 'Riset 40 klinik di Jabodetabek, MVP pendaftaran + antrean.'], ['2024', 'Tambah RME, farmasi, kasir. Lolos uji bridging SATUSEHAT.'], ['2025', '100 klinik. Rilis multi-cabang + laporan owner.'], ['2026', '240+ klinik. Fokus: BPJS, lab integrasi, dan AI resume.']].map(([y, d]) => (
            <div key={y} className="flex gap-5"><span className="font-display text-xl text-primary-800 w-14 shrink-0">{y}</span><p className="text-[15px] text-ink-700">{d}</p></div>
          ))}
        </div>
      </div>
    </section>
  </MainLayout>
);

export default AboutPage;

