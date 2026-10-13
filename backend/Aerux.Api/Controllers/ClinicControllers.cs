using Aerux.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aerux.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> All([FromQuery] string? q)
    {
        var query = db.Patients.AsQueryable();
        if (!string.IsNullOrWhiteSpace(q))
            query = query.Where(p => p.Nama.Contains(q));
        return Ok(await query.OrderByDescending(p => p.Id).ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> One(int id)
        => await db.Patients.FindAsync(id) is { } p ? Ok(p) : NotFound();

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Patient p)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        p.Id = 0;
        db.Patients.Add(p);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(One), new { id = p.Id }, p);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] Patient p)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        var existing = await db.Patients.FindAsync(id);
        if (existing is null) return NotFound();
        existing.Nama = p.Nama; existing.Nik = p.Nik; existing.Usia = p.Usia;
        existing.Kunjungan = p.Kunjungan; existing.Terakhir = p.Terakhir;
        await db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await db.Patients.FindAsync(id);
        if (existing is null) return NotFound();
        db.Patients.Remove(existing);
        await db.SaveChangesAsync();
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class AppointmentsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> All([FromQuery] string? q)
    {
        var query = db.Appointments.AsQueryable();
        if (!string.IsNullOrWhiteSpace(q))
            query = query.Where(a => a.Pasien.Contains(q) || a.Poli.Contains(q) || a.Dokter.Contains(q));
        return Ok(await query.OrderBy(a => a.Jam).ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> One(int id)
        => await db.Appointments.FindAsync(id) is { } a ? Ok(a) : NotFound();

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Appointment a)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        a.Id = 0;
        if (string.IsNullOrWhiteSpace(a.Status)) a.Status = "Terjadwal";
        db.Appointments.Add(a);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(One), new { id = a.Id }, a);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] Appointment a)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        var existing = await db.Appointments.FindAsync(id);
        if (existing is null) return NotFound();
        existing.Jam = a.Jam; existing.Pasien = a.Pasien; existing.Poli = a.Poli;
        existing.Dokter = a.Dokter; existing.Status = a.Status;
        await db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpPatch("{id:int}/status")]
    public async Task<IActionResult> SetStatus(int id, [FromBody] StatusDto dto)
    {
        var existing = await db.Appointments.FindAsync(id);
        if (existing is null) return NotFound();
        existing.Status = dto.Status;
        await db.SaveChangesAsync();
        return Ok(existing);
    }
    public record StatusDto(string Status);

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await db.Appointments.FindAsync(id);
        if (existing is null) return NotFound();
        db.Appointments.Remove(existing);
        await db.SaveChangesAsync();
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class MedicinesController(AppDbContext db) : ControllerBase
{
    [HttpGet] public async Task<IActionResult> All()
        => Ok(await db.Medicines.OrderBy(m => m.Nama).ToListAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> One(int id)
        => await db.Medicines.FindAsync(id) is { } m ? Ok(m) : NotFound();

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Medicine m)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        m.Id = 0;
        db.Medicines.Add(m);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(One), new { id = m.Id }, m);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] Medicine m)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        var existing = await db.Medicines.FindAsync(id);
        if (existing is null) return NotFound();
        existing.Nama = m.Nama; existing.Stok = m.Stok; existing.Min = m.Min; existing.Harga = m.Harga;
        await db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpPost("{id:int}/restock")]
    public async Task<IActionResult> Restock(int id, [FromBody] RestockDto dto)
    {
        var existing = await db.Medicines.FindAsync(id);
        if (existing is null) return NotFound();
        existing.Stok += dto.Jumlah <= 0 ? 100 : dto.Jumlah;
        await db.SaveChangesAsync();
        return Ok(existing);
    }
    public record RestockDto(int Jumlah);

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await db.Medicines.FindAsync(id);
        if (existing is null) return NotFound();
        db.Medicines.Remove(existing);
        await db.SaveChangesAsync();
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class DoctorsController(AppDbContext db) : ControllerBase
{
    [HttpGet] public async Task<IActionResult> All()
        => Ok(await db.Doctors.OrderBy(d => d.Nama).ToListAsync());
}

[ApiController]
[Route("api/[controller]")]
public class DashboardController(AppDbContext db) : ControllerBase
{
    [HttpGet("stats")]
    public async Task<IActionResult> Stats() => Ok(new
    {
        klinik = "Klinik Kirana Menteng",
        pasienHariIni = await db.Appointments.CountAsync() + 27,
        dokterJaga = await db.Doctors.CountAsync(),
        obatMenipis = await db.Medicines.CountAsync(m => m.Stok < m.Min),
        revenueHariIni = 8400000,
        jadwalHariIni = await db.Appointments.OrderBy(a => a.Jam).ToListAsync(),
        pasienTerbaru = await db.Patients.OrderByDescending(p => p.Id).Take(6).ToListAsync(),
    });
}
