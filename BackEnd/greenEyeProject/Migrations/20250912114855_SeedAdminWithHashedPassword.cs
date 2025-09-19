using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace greenEyeProject.Migrations
{
    /// <inheritdoc />
    public partial class SeedAdminWithHashedPassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "IsEmailVerified", "PasswordHash" },
                values: new object[] { new DateTime(2025, 9, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "AQAAAAIAAYagAAAAEOmip53VeFps8pIdWZ5xzRxG/VZCrcSsQWnyT9/mvEeydoIVrCMTlRj2LKtmm4xkHA==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "IsEmailVerified", "PasswordHash" },
                values: new object[] { new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, "Admin@123" });
        }
    }
}
