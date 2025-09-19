using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace greenEyeProject.Migrations
{
    /// <inheritdoc />
    public partial class RemovePasswordHash : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "PasswordHash",
                value: "Admin@123");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEBUtXzoRCmT4DwEpEsbCN2gTh4NgTfqVqaRm+xRAh9y8VGSZaN0uL0jkDd0Z0XhL7A==");
        }
    }
}
