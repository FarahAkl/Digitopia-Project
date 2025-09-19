using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace greenEyeProject.Migrations
{
    /// <inheritdoc />
    public partial class CleanCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recommendations_Analyses_AnalysisId",
                table: "Recommendations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Locations_LocationId",
                table: "Reports");

            migrationBuilder.DropTable(
                name: "Analyses");

            migrationBuilder.DropTable(
                name: "ClimateData");

            migrationBuilder.DropTable(
                name: "SatelliteData");

            migrationBuilder.DropTable(
                name: "SoilData");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_Reports_LocationId",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_Recommendations_AnalysisId",
                table: "Recommendations");

            migrationBuilder.DropColumn(
                name: "AnalysisId",
                table: "Recommendations");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Users",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Location",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Reports");

            migrationBuilder.AddColumn<int>(
                name: "AnalysisId",
                table: "Recommendations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    LocationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    LocationName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.LocationId);
                    table.ForeignKey(
                        name: "FK_Locations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Analyses",
                columns: table => new
                {
                    AnalysisId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    AnalyzedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RiskPrediction = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Analyses", x => x.AnalysisId);
                    table.ForeignKey(
                        name: "FK_Analyses_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "LocationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClimateData",
                columns: table => new
                {
                    ClimateDataId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    Humidity = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    Rainfall = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    RecordedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Temperature = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClimateData", x => x.ClimateDataId);
                    table.ForeignKey(
                        name: "FK_ClimateData_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "LocationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SatelliteData",
                columns: table => new
                {
                    SatelliteDataId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    CapturedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NDVI = table.Column<decimal>(type: "decimal(5,3)", precision: 5, scale: 3, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SatelliteData", x => x.SatelliteDataId);
                    table.ForeignKey(
                        name: "FK_SatelliteData_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "LocationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SoilData",
                columns: table => new
                {
                    SoilDataId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    Carbon = table.Column<decimal>(type: "decimal(8,3)", precision: 8, scale: 3, nullable: false),
                    CollectedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Salinity = table.Column<decimal>(type: "decimal(8,3)", precision: 8, scale: 3, nullable: false),
                    Texture = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    pH = table.Column<decimal>(type: "decimal(4,2)", precision: 4, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SoilData", x => x.SoilDataId);
                    table.ForeignKey(
                        name: "FK_SoilData_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "LocationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Locations",
                columns: new[] { "LocationId", "Latitude", "LocationName", "Longitude", "UserId" },
                values: new object[,]
                {
                    { 1, 30.123000000000001, "Head Office", 31.456, 1 },
                    { 2, 29.986999999999998, "Branch Office", 31.765000000000001, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reports_LocationId",
                table: "Reports",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Recommendations_AnalysisId",
                table: "Recommendations",
                column: "AnalysisId");

            migrationBuilder.CreateIndex(
                name: "IX_Analyses_LocationId",
                table: "Analyses",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_ClimateData_LocationId",
                table: "ClimateData",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Locations_UserId",
                table: "Locations",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SatelliteData_LocationId",
                table: "SatelliteData",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_SoilData_LocationId",
                table: "SoilData",
                column: "LocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recommendations_Analyses_AnalysisId",
                table: "Recommendations",
                column: "AnalysisId",
                principalTable: "Analyses",
                principalColumn: "AnalysisId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Locations_LocationId",
                table: "Reports",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "LocationId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
