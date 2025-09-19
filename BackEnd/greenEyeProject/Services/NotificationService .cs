using greenEyeProject.DTOs.Notification_DTOs;
using greenEyeProject.Models;
using greenEyeProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

public class NotificationService : INotificationService
{
    private readonly AppDbContext _context;

    public NotificationService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<NotificationDto> CreateNotificationAsync(CreateNotificationDto dto)
    {
        var notification = new Notification
        {
            UserId = dto.UserId,
            Message = dto.Message,
            CreatedAt = DateTime.UtcNow
        };

        _context.Notifications.Add(notification);
        await _context.SaveChangesAsync();

        return new NotificationDto
        {
            NotificationId = notification.NotificationId,
            Message = notification.Message,
            CreatedAt = notification.CreatedAt,
            IsRead = notification.IsRead
        };
    }

    public async Task<IEnumerable<NotificationDto>> GetUserNotificationsAsync(int userId)
    {
        return await _context.Notifications
            .Where(n => n.UserId == userId)
            .OrderByDescending(n => n.CreatedAt)
            .Select(n => new NotificationDto
            {
                NotificationId = n.NotificationId,
                Message = n.Message,
                CreatedAt = n.CreatedAt,
                IsRead = n.IsRead
            })
            .ToListAsync();
    }

    public async Task MarkAsReadAsync(int notificationId)
    {
        var notification = await _context.Notifications.FindAsync(notificationId);
        if (notification != null)
        {
            notification.IsRead = true;
            await _context.SaveChangesAsync();
        }
    }
}
