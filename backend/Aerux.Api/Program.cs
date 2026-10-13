using Aerux.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseSqlite(builder.Configuration.GetConnectionString("Default") ?? "Data Source=kirana.db"));
builder.Services.AddCors(o => o.AddPolicy("react", p =>
    p.WithOrigins("http://localhost:3000", "http://localhost:5173")
     .AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await AppDbContext.SeedAsync(db);
}

app.MapOpenApi();
app.UseCors("react");
app.MapControllers();

app.MapGet("/", () => Results.Json(new { service = "kirana-clinic-api", docs = "/openapi/v1.json", health = "/health" }));
app.MapGet("/health", () => new { status = "ok", service = "kirana-clinic-api", time = DateTime.UtcNow });

app.Run();
