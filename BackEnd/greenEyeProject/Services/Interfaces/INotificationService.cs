using greenEyeProject.DTOs.Notification_DTOs;

namespace greenEyeProject.Services.Interfaces
{
    public interface INotificationService
    {
        Task<NotificationDto> CreateNotificationAsync(CreateNotificationDto dto);
        Task<IEnumerable<NotificationDto>> GetUserNotificationsAsync(int userId);
        Task MarkAsReadAsync(int notificationId);
    }
}
