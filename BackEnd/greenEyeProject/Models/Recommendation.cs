using System.ComponentModel.DataAnnotations;

namespace greenEyeProject.Models
{
    public class Recommendation
    {
        public int RecommendationId { get; set; }

        [MaxLength(100)]
        public string CropType { get; set; }

        public string LandUseStrategy { get; set; }
        public string Notes { get; set; }
        public DateTime CreatedAt { get; set; }

        //// FK
        //public int AnalysisId { get; set; }
        //public AIAnalysis Analysis { get; set; }
    }

}
