namespace greenEyeProject.DTOs.Notification_DTOs
{
    public class NotificationDto
    {
        public int NotificationId { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsRead { get; set; }
    }
}
