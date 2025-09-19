using System;
using System.ComponentModel.DataAnnotations;

namespace greenEyeProject.Models
{
    public class Report
    {
        [Key]
        public int Id { get; set; }

        // FK to Location
        public int LocationId { get; set; }
        public string Location { get; set; }

        public DateTime AnalysisDate { get; set; } = DateTime.UtcNow;

        public decimal PredictedNdvi { get; set; }
        public string SeverityLevel { get; set; } = string.Empty;
        public string KeyDrivers { get; set; } = string.Empty;      // JSON string
        public string Recommendations { get; set; } = string.Empty; // JSON string

        // Optional metadata
        public string? ReportUrl { get; set; }

        // User relation
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
