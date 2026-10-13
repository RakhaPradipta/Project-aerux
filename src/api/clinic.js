const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function req(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = data?.title || data?.message || `Gagal (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export const clinicApi = {
  base: API,
  stats: () => req('/api/dashboard/stats'),
  doctors: () => req('/api/doctors'),
  patients: (q = '') => req(`/api/patients${q ? `?q=${encodeURIComponent(q)}` : ''}`),
  createPatient: (d) => req('/api/patients', { method: 'POST', body: JSON.stringify(d) }),
  updatePatient: (id, d) => req(`/api/patients/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  deletePatient: (id) => req(`/api/patients/${id}`, { method: 'DELETE' }),
  appointments: (q = '') => req(`/api/appointments${q ? `?q=${encodeURIComponent(q)}` : ''}`),
  createAppointment: (d) => req('/api/appointments', { method: 'POST', body: JSON.stringify(d) }),
  updateAppointment: (id, d) => req(`/api/appointments/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  setAppointmentStatus: (id, status) => req(`/api/appointments/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteAppointment: (id) => req(`/api/appointments/${id}`, { method: 'DELETE' }),
  medicines: () => req('/api/medicines'),
  createMedicine: (d) => req('/api/medicines', { method: 'POST', body: JSON.stringify(d) }),
  updateMedicine: (id, d) => req(`/api/medicines/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  restockMedicine: (id, jumlah = 100) => req(`/api/medicines/${id}/restock`, { method: 'POST', body: JSON.stringify({ jumlah }) }),
  deleteMedicine: (id) => req(`/api/medicines/${id}`, { method: 'DELETE' }),
};
