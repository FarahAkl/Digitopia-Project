using greenEyeProject.Models;
using Microsoft.EntityFrameworkCore;
using System;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Role> Roles { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Recommendation> Recommendations { get; set; }
    public DbSet<Report> Reports { get; set; }
    public DbSet<Notification> Notifications { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Default value for CreatedAt
        modelBuilder.Entity<User>()
            .Property(u => u.CreatedAt)
            .HasDefaultValueSql("GETUTCDATE()");

        // Fix multiple cascade paths for Reports
        modelBuilder.Entity<Report>()
            .HasOne(r => r.User)
            .WithMany(u => u.Reports)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Seed Roles
        modelBuilder.Entity<Role>().HasData(
            new Role { RoleId = 1, RoleName = "Admin" },
            new Role { RoleId = 2, RoleName = "User" }
        );

        // Seed Admin User (static PasswordHash)
        modelBuilder.Entity<User>().HasData(
            new User
            {
                UserId = 1,
                Name = "System Admin",
                Email = "admin@greeneye.com",
                PhoneNumber = "01016943529",
                ProfileImageUrl = "https://drive.google.com/file/d/1p2vkEedqZrs70gInc8LKI0sdHUaYwnMH/view?usp=sharing",
                Location = "Aga",
                RoleId = 1,
                CreatedAt = new DateTime(2025, 9, 12),
                IsEmailVerified = true,
                EmailVerificationToken = null,
                EmailVerificationTokenExpiry = null,
                PasswordHash = "AQAAAAIAAYagAAAAEOmip53VeFps8pIdWZ5xzRxG/VZCrcSsQWnyT9/mvEeydoIVrCMTlRj2LKtmm4xkHA==" // precomputed hash for "Admin@123"
            }
        );
    }
}
