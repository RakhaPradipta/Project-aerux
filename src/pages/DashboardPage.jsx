import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoGrid, IoCalendar, IoPeople, IoMedkit, IoBarChart, IoAdd, IoSearch, IoLogOut, IoPencil, IoTrash, IoClose, IoCheckmark } from 'react-icons/io5';
import toast from 'react-hot-toast';
import Logo from '../components/Logo';
import { clinicApi } from '../api/clinic';

const SEED_JADWAL = [
  { id: 'j1', jam: '08.30', pasien: 'Aisyah Rahma', poli: 'Umum', dokter: 'dr. Nadia', status: 'Hadir' },
  { id: 'j2', jam: '09.00', pasien: 'Budi Santoso', poli: 'Gigi', dokter: 'dr. Hendra', status: 'Menunggu' },
  { id: 'j3', jam: '09.30', pasien: 'Siti Aminah', poli: 'KIA', dokter: 'dr. Nadia', status: 'Hadir' },
  { id: 'j4', jam: '10.00', pasien: 'Dewi Lestari', poli: 'Kulit', dokter: 'dr. Putri', status: 'Terjadwal' },
];
const SEED_PASIEN = [
  { id: 'p1', nama: 'Aisyah Rahma', nik: '3174••••01', usia: 29, kunjungan: 8, terakhir: 'Hari ini' },
  { id: 'p2', nama: 'Budi Santoso', nik: '3174••••02', usia: 45, kunjungan: 5, terakhir: 'Hari ini' },
  { id: 'p3', nama: 'Siti Aminah', nik: '3174••••03', usia: 32, kunjungan: 12, terakhir: 'Kemarin' },
  { id: 'p4', nama: 'Dewi Lestari', nik: '3174••••04', usia: 26, kunjungan: 3, terakhir: '2 hari lalu' },
];
const SEED_OBAT = [
  { id: 'o1', nama: 'Paracetamol 500mg', stok: 420, min: 100, harga: 500 },
  { id: 'o2', nama: 'Amoxicillin 500mg', stok: 68, min: 100, harga: 1200 },
  { id: 'o3', nama: 'Antasida Tablet', stok: 230, min: 80, harga: 800 },
  { id: 'o4', nama: 'Salep Hidrokortison', stok: 24, min: 30, harga: 8500 },
];
const KUNJUNGAN = [
  { h: 'Sen', v: 22 }, { h: 'Sel', v: 28 }, { h: 'Rab', v: 25 }, { h: 'Kam', v: 31 }, { h: 'Jum', v: 29 }, { h: 'Sab', v: 34 },
];
const STATUS_JADWAL = ['Terjadwal', 'Menunggu', 'Hadir', 'Selesai', 'Batal'];

const menu = [
  ['Ringkasan', 'ringkasan', <IoGrid />],
  ['Jadwal', 'jadwal', <IoCalendar />],
  ['Pasien', 'pasien', <IoPeople />],
  ['Farmasi', 'farmasi', <IoMedkit />],
  ['Laporan', 'laporan', <IoBarChart />],
];

const inputCls = 'w-full border border-ink-900/15 rounded-xl px-4 py-2.5 bg-cream-50 text-sm focus:outline-none focus:border-primary-700';
const btnPrimary = 'w-full bg-ink-900 text-white rounded-full py-2.5 font-medium text-sm inline-flex justify-center items-center gap-2 hover:bg-black disabled:opacity-50';

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink-900/50" onClick={onClose}>
      <div className="bg-cream-50 w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-ink-900/5 rounded-full"><IoClose size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function RowButtons({ onEdit, onDelete, extra }) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      {extra}
      <button onClick={onEdit} title="Ubah" className="w-8 h-8 flex items-center justify-center rounded-full border border-ink-900/15 text-ink-700 hover:bg-ink-900 hover:text-white"><IoPencil size={14} /></button>
      <button onClick={onDelete} title="Hapus" className="w-8 h-8 flex items-center justify-center rounded-full border border-red-200 text-red-600 hover:bg-red-600 hover:text-white"><IoTrash size={14} /></button>
    </div>
  );
}

function Empty({ text }) {
  return <p className="px-5 py-10 text-center text-sm text-ink-500">{text}</p>;
}

export default function DashboardPage() {
  const [tab, setTab] = useState('ringkasan');
  const [q, setQ] = useState('');
  const [jadwal, setJadwal] = useState([]);
  const [pasien, setPasien] = useState([]);
  const [obat, setObat] = useState([]);
  const [dokterJaga, setDokterJaga] = useState(4);
  const [online, setOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fJ, setFJ] = useState({ pasien: '', poli: 'Umum', dokter: 'dr. Nadia', jam: '11.00' });
  const [fP, setFP] = useState({ nama: '', usia: '', nik: '' });
  const [fO, setFO] = useState({ nama: '', stok: '', min: '', harga: '' });
  const [editJ, setEditJ] = useState(null);
  const [editP, setEditP] = useState(null);
  const [editO, setEditO] = useState(null);
  const qTimer = useRef(null);

  const loadAll = useCallback(async (keyword = '') => {
    try {
      const [s, j, p, o] = await Promise.all([
        clinicApi.stats(),
        clinicApi.appointments(keyword),
        clinicApi.patients(keyword),
        clinicApi.medicines(),
      ]);
      setJadwal(j); setPasien(p); setObat(o);
      setDokterJaga(s.dokterJaga ?? 4);
      setOnline(true);
    } catch {
      setOnline(false);
      setJadwal((prev) => (prev.length ? prev : SEED_JADWAL));
      setPasien((prev) => (prev.length ? prev : SEED_PASIEN));
      setObat((prev) => (prev.length ? prev : SEED_OBAT));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  useEffect(() => {
    if (!online) return;
    clearTimeout(qTimer.current);
    qTimer.current = setTimeout(async () => {
      try {
        const [j, p] = await Promise.all([clinicApi.appointments(q), clinicApi.patients(q)]);
        setJadwal(j); setPasien(p);
      } catch { /* tetap tampilkan data lama */ }
    }, 400);
    return () => clearTimeout(qTimer.current);
  }, [q, online]);

  const fJadwal = online ? jadwal : jadwal.filter((j) => (j.pasien + j.poli + j.dokter).toLowerCase().includes(q.toLowerCase()));
  const fPasien = online ? pasien : pasien.filter((p) => p.nama.toLowerCase().includes(q.toLowerCase()));

  const stats = useMemo(() => ([
    ['Pasien hari ini', jadwal.length + 27, '+12% vs kemarin'],
    ['Dokter jaga', dokterJaga, '2 poli penuh'],
    ['Obat menipis', obat.filter((o) => o.stok < o.min).length, 'perlu restock'],
    ['Revenue hari ini', 'Rp 8,4 jt', '+8% vs rerata'],
  ]), [jadwal, obat, dokterJaga]);

  const confirmHapus = (nama) => window.confirm(`Hapus "${nama}"? Tindakan ini permanen.`);

  // ---- JADWAL ----
  const simpanJadwal = async () => {
    if (!fJ.pasien.trim() || !fJ.jam.trim()) return toast.error('Isi nama pasien dan jam.');
    setSaving(true);
    try {
      if (online) {
        const b = await clinicApi.createAppointment({ ...fJ, status: 'Terjadwal' });
        setJadwal((prev) => [...prev, b].sort((a, b2) => String(a.jam).localeCompare(String(b2.jam))));
      } else {
        setJadwal((prev) => [...prev, { id: String(Date.now()), ...fJ, status: 'Terjadwal' }]);
      }
      setFJ({ pasien: '', poli: 'Umum', dokter: 'dr. Nadia', jam: '11.00' });
      toast.success('Jadwal ditambahkan.');
    } catch (e) { toast.error(e.message); } finally { setSaving(false); }
  };
  const updateJadwal = async () => {
    if (!editJ) return;
    setSaving(true);
    try {
      if (online) {
        const b = await clinicApi.updateAppointment(editJ.id, editJ);
        setJadwal((prev) => prev.map((x) => (x.id === b.id ? b : x)));
      } else setJadwal((prev) => prev.map((x) => (x.id === editJ.id ? editJ : x)));
      setEditJ(null);
      toast.success('Jadwal diperbarui.');
    } catch (e) { toast.error(e.message); } finally { setSaving(false); }
  };
  const hapusJadwal = async (j) => {
    if (!confirmHapus(`${j.pasien} (${j.jam})`)) return;
    try {
      if (online) await clinicApi.deleteAppointment(j.id);
      setJadwal((prev) => prev.filter((x) => x.id !== j.id));
      toast.success('Jadwal dihapus.');
    } catch (e) { toast.error(e.message); }
  };
  const majuStatus = async (j) => {
    const order = ['Terjadwal', 'Menunggu', 'Hadir', 'Selesai'];
    const next = order[Math.min(order.indexOf(j.status) + 1, order.length - 1)] || 'Hadir';
    try {
      if (online) {
        const b = await clinicApi.setAppointmentStatus(j.id, next);
        setJadwal((prev) => prev.map((x) => (x.id === b.id ? b : x)));
      } else setJadwal((prev) => prev.map((x) => (x.id === j.id ? { ...x, status: next } : x)));
    } catch (e) { toast.error(e.message); }
  };

  // ---- PASIEN ----
  const simpanPasien = async () => {
    if (!fP.nama.trim()) return toast.error('Isi nama pasien.');
    setSaving(true);
    try {
      const payload = { nama: fP.nama.trim(), nik: fP.nik.trim() || '-', usia: +fP.usia || 0, kunjungan: 1, terakhir: 'Baru saja' };
      if (online) {
        const b = await clinicApi.createPatient(payload);
        setPasien((prev) => [b, ...prev]);
      } else setPasien((prev) => [{ id: String(Date.now()), ...payload }, ...prev]);
      setFP({ nama: '', usia: '', nik: '' });
      toast.success('Pasien didaftarkan.');
    } catch (e) { toast.error(e.message); } finally { setSaving(false); }
  };
  const updatePasien = async () => {
    if (!editP) return;
    setSaving(true);
    try {
      if (online) {
        const b = await clinicApi.updatePatient(editP.id, editP);
        setPasien((prev) => prev.map((x) => (x.id === b.id ? b : x)));
      } else setPasien((prev) => prev.map((x) => (x.id === editP.id ? editP : x)));
      setEditP(null);
      toast.success('Data pasien diperbarui.');
    } catch (e) { toast.error(e.message); } finally { setSaving(false); }
  };
  const hapusPasien = async (p) => {
    if (!confirmHapus(p.nama)) return;
    try {
      if (online) await clinicApi.deletePatient(p.id);
      setPasien((prev) => prev.filter((x) => x.id !== p.id));
      toast.success('Pasien dihapus.');
    } catch (e) { toast.error(e.message); }
  };

  // ---- OBAT ----
  const simpanObat = async () => {
    if (!fO.nama.trim()) return toast.error('Isi nama obat.');
    setSaving(true);
    try {
      const payload = { nama: fO.nama.trim(), stok: +fO.stok || 0, min: +fO.min || 0, harga: +fO.harga || 0 };
      if (online) {
        const b = await clinicApi.createMedicine(payload);
        setObat((prev) => [...prev, b].sort((a, b2) => a.nama.localeCompare(b2.nama)));
      } else setObat((prev) => [...prev, { id: String(Date.now()), ...payload }]);
      setFO({ nama: '', stok: '', min: '', harga: '' });
      toast.success('Obat ditambahkan.');
    } catch (e) { toast.error(e.message); } finally { setSaving(false); }
  };
  const updateObat = async () => {
    if (!editO) return;
    setSaving(true);
    try {
      if (online) {
        const b = await clinicApi.updateMedicine(editO.id, editO);
        setObat((prev) => prev.map((x) => (x.id === b.id ? b : x)));
      } else setObat((prev) => prev.map((x) => (x.id === editO.id ? editO : x)));
      setEditO(null);
      toast.success('Data obat diperbarui.');
    } catch (e) { toast.error(e.message); } finally { setSaving(false); }
  };
  const restock = async (o, jumlah = 100) => {
    try {
      if (online) {
        const b = await clinicApi.restockMedicine(o.id, jumlah);
        setObat((prev) => prev.map((x) => (x.id === b.id ? b : x)));
      } else setObat((prev) => prev.map((x) => (x.id === o.id ? { ...x, stok: x.stok + jumlah } : x)));
      toast.success(`${o.nama} +${jumlah}.`);
    } catch (e) { toast.error(e.message); }
  };
  const hapusObat = async (o) => {
    if (!confirmHapus(o.nama)) return;
    try {
      if (online) await clinicApi.deleteMedicine(o.id);
      setObat((prev) => prev.filter((x) => x.id !== o.id));
      toast.success('Obat dihapus.');
    } catch (e) { toast.error(e.message); }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex">
      <aside className="hidden md:flex w-64 shrink-0 bg-primary-950 text-cream-50 flex-col p-6 sticky top-0 h-screen">
        <Logo dark />
        <nav className="mt-10 space-y-1 flex-1">
          {menu.map(([label, key, icon]) => (
            <button key={key} onClick={() => setTab(key)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] ${tab === key ? 'bg-white/10 text-gold-200 font-semibold' : 'text-white/65 hover:text-white hover:bg-white/5'}`}>
              <span className="text-lg">{icon}</span>{label}
            </button>
          ))}
        </nav>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm">
          <p className="text-white/50 text-xs uppercase tracking-widest">Database SQLite (C#)</p>
          <p className={`font-semibold mt-1 ${online ? 'text-emerald-300' : 'text-amber-300'}`}>{online ? '● Terhubung' : '● Mode demo lokal'}</p>
          <p className="text-white/40 text-xs mt-1">{clinicApi.base}</p>
        </div>
        <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white text-sm mt-4 px-2"><IoLogOut /> Kembali ke web</Link>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="md:hidden bg-primary-950 text-cream-50 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <Logo dark />
          <Link to="/" className="text-sm text-white/70">← Web</Link>
        </div>
        <div className="md:hidden flex gap-2 overflow-x-auto px-4 py-3 bg-cream-50 border-b border-ink-900/10 sticky top-[64px] z-10">
          {menu.map(([label, key]) => <button key={key} onClick={() => setTab(key)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${tab === key ? 'bg-ink-900 text-white' : 'bg-white border border-ink-900/15'}`}>{label}</button>)}
        </div>

        <div className="p-5 md:p-8 max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
            <div>
              <p className="eyebrow">Klinik Kirana Menteng</p>
              <h1 className="font-display text-3xl md:text-4xl font-semibold capitalize">{tab}</h1>
              <p className="text-ink-500 text-sm mt-1">
                {loading ? 'Memuat data...' : online ? 'CRUD penuh — tersimpan permanen di SQLite' : 'Offline — perubahan hanya sementara'}
              </p>
            </div>
            <label className="flex items-center gap-2 bg-white border border-ink-900/15 rounded-full px-4 py-2.5 w-full md:w-72 text-sm">
              <IoSearch className="text-ink-500 shrink-0" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari pasien, poli, dokter..." className="bg-transparent outline-none w-full" />
            </label>
          </div>

          {loading ? (
            <div className="space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="card-elegant p-5 animate-pulse"><div className="h-4 bg-ink-900/10 rounded w-2/3" /><div className="h-3 bg-ink-900/10 rounded w-1/3 mt-2" /></div>)}</div>
          ) : (<>
          {tab === 'ringkasan' && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map(([l, v, s]) => (
                  <div key={l} className="card-elegant p-5"><p className="text-[13px] text-ink-500">{l}</p><p className="font-display text-[26px] font-semibold mt-1">{v}</p><p className="text-xs text-primary-700 mt-1">{s}</p></div>
                ))}
              </div>
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="card-elegant p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">Kunjungan 6 hari</h3>
                  <div className="flex items-end gap-3 h-40">
                    {KUNJUNGAN.map((d) => <div key={d.h} className="flex-1 flex flex-col items-center gap-2"><div className="w-full bg-primary-900 rounded-t-lg" style={{ height: `${(d.v / 34) * 120}px` }} /><span className="text-xs text-ink-500">{d.h}</span></div>)}
                  </div>
                </div>
                <div className="card-elegant p-6">
                  <h3 className="font-display text-xl font-semibold mb-4">Perlu perhatian</h3>
                  <ul className="space-y-3 text-[15px]">
                    {obat.filter((o) => o.stok < o.min).map((o) => <li key={o.id} className="flex flex-wrap gap-2 justify-between bg-gold-100 border border-gold-500/40 rounded-xl px-4 py-3"><span><b>{o.nama}</b> — sisa {o.stok}</span><button onClick={() => setTab('farmasi')} className="font-semibold text-primary-800">Restock →</button></li>)}
                    {obat.filter((o) => o.stok < o.min).length === 0 && <li className="text-sm text-ink-500">Semua stok aman. 🎉</li>}
                  </ul>
                </div>
              </div>
            </>
          )}

          {tab === 'jadwal' && (
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="card-elegant p-6 h-fit">
                <h3 className="font-display text-xl font-semibold mb-4">Tambah jadwal</h3>
                <div className="space-y-3">
                  <input value={fJ.pasien} onChange={(e) => setFJ({ ...fJ, pasien: e.target.value })} placeholder="Nama pasien" className={inputCls} />
                  <div className="grid grid-cols-2 gap-3">
                    <select value={fJ.poli} onChange={(e) => setFJ({ ...fJ, poli: e.target.value })} className={inputCls}><option>Umum</option><option>Gigi</option><option>KIA</option><option>Kulit</option></select>
                    <select value={fJ.dokter} onChange={(e) => setFJ({ ...fJ, dokter: e.target.value })} className={inputCls}><option>dr. Nadia</option><option>dr. Hendra</option><option>dr. Putri</option><option>dr. Sari</option></select>
                  </div>
                  <input value={fJ.jam} onChange={(e) => setFJ({ ...fJ, jam: e.target.value })} placeholder="Jam (cth 11.00)" className={inputCls} />
                  <button onClick={simpanJadwal} disabled={saving} className={btnPrimary}><IoAdd /> {saving ? 'Menyimpan...' : 'Simpan'}</button>
                </div>
              </div>
              <div className="lg:col-span-2 card-elegant overflow-hidden h-fit">
                {fJadwal.length === 0 && <Empty text="Tidak ada jadwal. Tambahkan di formulir." />}
                {fJadwal.map((j) => (
                  <div key={j.id} className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-ink-900/5 last:border-0">
                    <div className="flex items-center gap-3 min-w-0"><span className="font-display text-base sm:text-lg text-primary-800 w-11 shrink-0">{j.jam}</span><div className="min-w-0"><p className="font-medium text-sm sm:text-base truncate">{j.pasien}</p><p className="text-xs sm:text-[13px] text-ink-500 truncate">{j.poli} • {j.dokter}</p></div></div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-1 ${j.status === 'Hadir' || j.status === 'Selesai' ? 'bg-primary-100 text-primary-800' : 'bg-cream-200 text-ink-700'}`}>{j.status}</span>
                      <RowButtons
                        extra={<button onClick={() => majuStatus(j)} title="Maju status" className="w-8 h-8 flex items-center justify-center rounded-full border border-primary-700/30 text-primary-800 hover:bg-primary-900 hover:text-white"><IoCheckmark size={14} /></button>}
                        onEdit={() => setEditJ({ ...j })}
                        onDelete={() => hapusJadwal(j)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'pasien' && (
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="card-elegant p-6 h-fit">
                <h3 className="font-display text-xl font-semibold mb-4">Pendaftaran</h3>
                <div className="space-y-3">
                  <input value={fP.nama} onChange={(e) => setFP({ ...fP, nama: e.target.value })} placeholder="Nama lengkap" className={inputCls} />
                  <div className="grid grid-cols-2 gap-3">
                    <input value={fP.usia} onChange={(e) => setFP({ ...fP, usia: e.target.value })} placeholder="Usia" type="number" min="0" max="130" className={inputCls} />
                    <input value={fP.nik} onChange={(e) => setFP({ ...fP, nik: e.target.value })} placeholder="NIK" className={inputCls} />
                  </div>
                  <button onClick={simpanPasien} disabled={saving} className={btnPrimary}><IoAdd /> {saving ? 'Menyimpan...' : 'Daftarkan'}</button>
                </div>
              </div>
              <div className="lg:col-span-2 card-elegant overflow-hidden h-fit">
                {fPasien.length === 0 && <Empty text="Pasien tidak ditemukan." />}
                {fPasien.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-ink-900/5 last:border-0">
                    <div className="min-w-0"><p className="font-medium text-sm sm:text-base truncate">{p.nama} <span className="text-ink-500 text-xs sm:text-sm">• {p.usia} thn</span></p><p className="text-xs sm:text-[13px] text-ink-500 truncate">{p.nik} • {p.kunjungan}x kunjungan • {p.terakhir}</p></div>
                    <RowButtons onEdit={() => setEditP({ ...p })} onDelete={() => hapusPasien(p)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'farmasi' && (
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="card-elegant p-6 h-fit">
                <h3 className="font-display text-xl font-semibold mb-4">Tambah obat</h3>
                <div className="space-y-3">
                  <input value={fO.nama} onChange={(e) => setFO({ ...fO, nama: e.target.value })} placeholder="Nama obat" className={inputCls} />
                  <div className="grid grid-cols-3 gap-2">
                    <input value={fO.stok} onChange={(e) => setFO({ ...fO, stok: e.target.value })} placeholder="Stok" type="number" min="0" className={inputCls} />
                    <input value={fO.min} onChange={(e) => setFO({ ...fO, min: e.target.value })} placeholder="Min" type="number" min="0" className={inputCls} />
                    <input value={fO.harga} onChange={(e) => setFO({ ...fO, harga: e.target.value })} placeholder="Harga" type="number" min="0" className={inputCls} />
                  </div>
                  <button onClick={simpanObat} disabled={saving} className={btnPrimary}><IoAdd /> {saving ? 'Menyimpan...' : 'Simpan'}</button>
                </div>
              </div>
              <div className="lg:col-span-2 card-elegant overflow-hidden h-fit">
                <div className="overflow-x-auto -mx-0"><table className="w-full text-sm min-w-[600px]">
                  <thead><tr className="text-left text-ink-500 border-b border-ink-900/10"><th className="px-5 py-3">Obat</th><th className="px-3 py-3">Stok</th><th className="px-3 py-3">Status</th><th className="px-5 py-3 text-right">Aksi</th></tr></thead>
                  <tbody>{obat.map((o) => (
                    <tr key={o.id} className="border-b border-ink-900/5 last:border-0">
                      <td className="px-5 py-3.5 font-medium">{o.nama}<br /><span className="text-xs text-ink-500 font-normal">Rp {(+o.harga).toLocaleString('id-ID')}</span></td>
                      <td className="px-3 py-3.5 whitespace-nowrap">{o.stok} <span className="text-ink-500 text-xs">(min {o.min})</span></td>
                      <td className="px-3 py-3.5">{o.stok < o.min ? <span className="text-xs bg-red-100 text-red-700 rounded-full px-3 py-1 font-semibold whitespace-nowrap">Menipis</span> : <span className="text-xs bg-primary-100 text-primary-800 rounded-full px-3 py-1 whitespace-nowrap">Aman</span>}</td>
                      <td className="px-5 py-3.5"><div className="flex justify-end gap-1.5">
                        <button onClick={() => restock(o)} title="+100" className="text-xs bg-ink-900 text-white rounded-full px-3 py-1.5 whitespace-nowrap">+100</button>
                        <button onClick={() => setEditO({ ...o })} title="Ubah" className="w-8 h-8 flex items-center justify-center rounded-full border border-ink-900/15 hover:bg-ink-900 hover:text-white"><IoPencil size={14} /></button>
                        <button onClick={() => hapusObat(o)} title="Hapus" className="w-8 h-8 flex items-center justify-center rounded-full border border-red-200 text-red-600 hover:bg-red-600 hover:text-white"><IoTrash size={14} /></button>
                      </div></td>
                    </tr>
                  ))}</tbody>
                </table></div>
              </div>
            </div>
          )}

          {tab === 'laporan' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="card-elegant p-6"><h3 className="font-display text-xl font-semibold mb-2">Revenue minggu ini</h3><p className="font-display text-3xl sm:text-4xl">Rp 52,8 jt</p><p className="text-sm text-primary-700 mt-1">▲ 11% vs minggu lalu</p><div className="flex items-end gap-2 h-28 mt-4">{[40, 55, 48, 70, 62, 80, 74].map((v, i) => <div key={i} className="flex-1 bg-gold-500/80 rounded-t" style={{ height: `${v}%` }} />)}</div></div>
              <div className="card-elegant p-6"><h3 className="font-display text-xl font-semibold mb-4">Ringkasan owner</h3><ul className="space-y-3 text-[15px]">{[['Kunjungan bulan ini', `${jadwal.length + 838} pasien`], ['Jadwal terdaftar', `${jadwal.length} slot`], ['Obat menipis', `${obat.filter((o) => o.stok < o.min).length} item`], ['Skor kepuasan', '4,9 / 5'], ['Total pasien', `${pasien.length} terdata`]].map(([a, b]) => <li key={a} className="flex justify-between gap-3 border-b border-ink-900/5 pb-2.5"><span className="text-ink-500">{a}</span><b className="text-right">{b}</b></li>)}</ul><button onClick={() => toast.success('Laporan PDF diunduh (demo).')} className="mt-5 w-full border border-ink-900/20 rounded-full py-2.5 text-sm font-medium hover:bg-ink-900 hover:text-white">Unduh PDF</button></div>
            </div>
          )}
          </>)}

          {!online && !loading && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-6">Backend belum jalan — tampil data demo. Jalankan <code>dotnet run --project backend/Aerux.Api/Aerux.Api.csproj --urls http://localhost:5000</code> lalu refresh.</p>
          )}
        </div>
      </div>

      {editJ && (
        <Modal title="Ubah jadwal" onClose={() => setEditJ(null)}>
          <div className="space-y-3">
            <input value={editJ.pasien} onChange={(e) => setEditJ({ ...editJ, pasien: e.target.value })} className={inputCls} placeholder="Nama pasien" />
            <div className="grid grid-cols-2 gap-3">
              <input value={editJ.jam} onChange={(e) => setEditJ({ ...editJ, jam: e.target.value })} className={inputCls} placeholder="Jam" />
              <select value={editJ.poli} onChange={(e) => setEditJ({ ...editJ, poli: e.target.value })} className={inputCls}><option>Umum</option><option>Gigi</option><option>KIA</option><option>Kulit</option></select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select value={editJ.dokter} onChange={(e) => setEditJ({ ...editJ, dokter: e.target.value })} className={inputCls}><option>dr. Nadia</option><option>dr. Hendra</option><option>dr. Putri</option><option>dr. Sari</option></select>
              <select value={editJ.status} onChange={(e) => setEditJ({ ...editJ, status: e.target.value })} className={inputCls}>{STATUS_JADWAL.map((s) => <option key={s}>{s}</option>)}</select>
            </div>
            <button onClick={updateJadwal} disabled={saving} className={btnPrimary}>{saving ? 'Menyimpan...' : 'Simpan perubahan'}</button>
          </div>
        </Modal>
      )}
      {editP && (
        <Modal title="Ubah pasien" onClose={() => setEditP(null)}>
          <div className="space-y-3">
            <input value={editP.nama} onChange={(e) => setEditP({ ...editP, nama: e.target.value })} className={inputCls} placeholder="Nama" />
            <div className="grid grid-cols-2 gap-3">
              <input value={editP.usia} onChange={(e) => setEditP({ ...editP, usia: +e.target.value || 0 })} type="number" className={inputCls} placeholder="Usia" />
              <input value={editP.nik} onChange={(e) => setEditP({ ...editP, nik: e.target.value })} className={inputCls} placeholder="NIK" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input value={editP.kunjungan} onChange={(e) => setEditP({ ...editP, kunjungan: +e.target.value || 0 })} type="number" className={inputCls} placeholder="Kunjungan" />
              <input value={editP.terakhir} onChange={(e) => setEditP({ ...editP, terakhir: e.target.value })} className={inputCls} placeholder="Terakhir" />
            </div>
            <button onClick={updatePasien} disabled={saving} className={btnPrimary}>{saving ? 'Menyimpan...' : 'Simpan perubahan'}</button>
          </div>
        </Modal>
      )}
      {editO && (
        <Modal title="Ubah obat" onClose={() => setEditO(null)}>
          <div className="space-y-3">
            <input value={editO.nama} onChange={(e) => setEditO({ ...editO, nama: e.target.value })} className={inputCls} placeholder="Nama obat" />
            <div className="grid grid-cols-3 gap-2">
              <input value={editO.stok} onChange={(e) => setEditO({ ...editO, stok: +e.target.value || 0 })} type="number" className={inputCls} placeholder="Stok" />
              <input value={editO.min} onChange={(e) => setEditO({ ...editO, min: +e.target.value || 0 })} type="number" className={inputCls} placeholder="Min" />
              <input value={editO.harga} onChange={(e) => setEditO({ ...editO, harga: +e.target.value || 0 })} type="number" className={inputCls} placeholder="Harga" />
            </div>
            <button onClick={updateObat} disabled={saving} className={btnPrimary}>{saving ? 'Menyimpan...' : 'Simpan perubahan'}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
