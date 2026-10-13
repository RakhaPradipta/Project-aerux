using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Aerux.Api.Data;

public class Patient
{
    public int Id { get; set; }
    [Required, MaxLength(100)] public string Nama { get; set; } = "";
    [MaxLength(30)] public string Nik { get; set; } = "";
    [Range(0, 130)] public int Usia { get; set; }
    public int Kunjungan { get; set; } = 1;
    [MaxLength(40)] public string Terakhir { get; set; } = "Baru saja";
}

public class Doctor
{
    public int Id { get; set; }
    [Required, MaxLength(100)] public string Nama { get; set; } = "";
    [Required, MaxLength(50)] public string Poli { get; set; } = "";
    [MaxLength(50)] public string JamPraktik { get; set; } = "";
}

public class Appointment
{
    public int Id { get; set; }
    [Required, MaxLength(10)] public string Jam { get; set; } = "";
    [Required, MaxLength(100)] public string Pasien { get; set; } = "";
    [Required, MaxLength(50)] public string Poli { get; set; } = "Umum";
    [Required, MaxLength(100)] public string Dokter { get; set; } = "";
    [MaxLength(20)] public string Status { get; set; } = "Terjadwal";
}

public class Medicine
{
    public int Id { get; set; }
    [Required, MaxLength(100)] public string Nama { get; set; } = "";
    [Range(0, 1_000_000)] public int Stok { get; set; }
    [Range(0, 1_000_000)] public int Min { get; set; }
    [Range(0, 1_000_000_000)] public decimal Harga { get; set; }
}

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<Doctor> Doctors => Set<Doctor>();
    public DbSet<Appointment> Appointments => Set<Appointment>();
    public DbSet<Medicine> Medicines => Set<Medicine>();

    public static async Task SeedAsync(AppDbContext db)
    {
        await db.Database.EnsureCreatedAsync();
        if (await db.Patients.AnyAsync()) return;

        db.Patients.AddRange(
            new Patient { Nama = "Aisyah Rahma", Nik = "3174••••01", Usia = 29, Kunjungan = 8, Terakhir = "Hari ini" },
            new Patient { Nama = "Budi Santoso", Nik = "3174••••02", Usia = 45, Kunjungan = 5, Terakhir = "Hari ini" },
            new Patient { Nama = "Siti Aminah", Nik = "3174••••03", Usia = 32, Kunjungan = 12, Terakhir = "Kemarin" },
            new Patient { Nama = "Dewi Lestari", Nik = "3174••••04", Usia = 26, Kunjungan = 3, Terakhir = "2 hari lalu" }
        );
        db.Doctors.AddRange(
            new Doctor { Nama = "dr. Nadia Prameswari", Poli = "Umum", JamPraktik = "08.00–14.00" },
            new Doctor { Nama = "dr. Hendra Wijaya", Poli = "Gigi", JamPraktik = "09.00–15.00" },
            new Doctor { Nama = "drg. Putri Ayu", Poli = "Kulit", JamPraktik = "10.00–16.00" },
            new Doctor { Nama = "dr. Sari Dewi", Poli = "KIA", JamPraktik = "08.00–12.00" }
        );
        db.Appointments.AddRange(
            new Appointment { Jam = "08.30", Pasien = "Aisyah Rahma", Poli = "Umum", Dokter = "dr. Nadia", Status = "Hadir" },
            new Appointment { Jam = "09.00", Pasien = "Budi Santoso", Poli = "Gigi", Dokter = "dr. Hendra", Status = "Menunggu" },
            new Appointment { Jam = "09.30", Pasien = "Siti Aminah", Poli = "KIA", Dokter = "dr. Nadia", Status = "Hadir" },
            new Appointment { Jam = "10.00", Pasien = "Dewi Lestari", Poli = "Kulit", Dokter = "dr. Putri", Status = "Terjadwal" }
        );
        db.Medicines.AddRange(
            new Medicine { Nama = "Paracetamol 500mg", Stok = 420, Min = 100, Harga = 500 },
            new Medicine { Nama = "Amoxicillin 500mg", Stok = 68, Min = 100, Harga = 1200 },
            new Medicine { Nama = "Antasida Tablet", Stok = 230, Min = 80, Harga = 800 },
            new Medicine { Nama = "Salep Hidrokortison", Stok = 24, Min = 30, Harga = 8500 }
        );
        await db.SaveChangesAsync();
    }
}
