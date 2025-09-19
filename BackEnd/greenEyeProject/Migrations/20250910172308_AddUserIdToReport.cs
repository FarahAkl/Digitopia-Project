using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace greenEyeProject.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Reports",
                newName: "SeverityLevel");

            migrationBuilder.RenameColumn(
                name: "RiskPrediction",
                table: "Reports",
                newName: "PredictedNdvi");

            migrationBuilder.RenameColumn(
                name: "GeneratedAt",
                table: "Reports",
                newName: "AnalysisDate");

            migrationBuilder.RenameColumn(
                name: "ReportId",
                table: "Reports",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "ReportUrl",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "KeyDrivers",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KeyDrivers",
                table: "Reports");

            migrationBuilder.RenameColumn(
                name: "SeverityLevel",
                table: "Reports",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "PredictedNdvi",
                table: "Reports",
                newName: "RiskPrediction");

            migrationBuilder.RenameColumn(
                name: "AnalysisDate",
                table: "Reports",
                newName: "GeneratedAt");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Reports",
                newName: "ReportId");

            migrationBuilder.AlterColumn<string>(
                name: "ReportUrl",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
