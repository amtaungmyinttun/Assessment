using GIC.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GIC.Infrastructure.Data
{
    public class GICDbContext(DbContextOptions<GICDbContext> options) : DbContext(options)
    {
        public DbSet<Cafe> Cafes { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Cafe)
                .WithMany(c => c.Employees)
                .HasForeignKey(e => e.CafeId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure auto-increment for primary keys
            modelBuilder.Entity<Cafe>()
                .Property(c => c.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Employee>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();
        }
    }
}
