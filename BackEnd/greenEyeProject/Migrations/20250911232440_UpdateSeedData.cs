using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace greenEyeProject.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "Location", "ProfileImageUrl" },
                values: new object[] { "Aga", "https://drive.google.com/file/d/1p2vkEedqZrs70gInc8LKI0sdHUaYwnMH/view?usp=sharing" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "Location", "ProfileImageUrl" },
                values: new object[] { null, null });
        }
    }
}
