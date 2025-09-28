using System.ComponentModel.DataAnnotations;

namespace greenEyeProject.Models
{
    public class Notification
    {
        public int NotificationId { get; set; }

        [Required]
        public string Message { get; set; }   

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsRead { get; set; } = false; 

        // FK
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
