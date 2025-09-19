using greenEyeProject.DTOs.Notification_DTOs;
using greenEyeProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace greenEyeProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        // ================== User Endpoints ==================
        [HttpGet("MyNotifications")]
        [Authorize]
        public async Task<IActionResult> GetMyNotifications()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized();

            var userId = int.Parse(userIdClaim.Value);
            var notifications = await _notificationService.GetUserNotificationsAsync(userId);

            return Ok(notifications);
        }

        [HttpPut("MarkAsRead/{id}")]
        [Authorize]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            await _notificationService.MarkAsReadAsync(id);
            return Ok(new { message = "Notification marked as read" });
        }

        // ================== Admin Endpoints ==================
        [HttpPost("Send")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SendNotification([FromBody] CreateNotificationDto dto)
        {
            var notification = await _notificationService.CreateNotificationAsync(dto);
            return Ok(notification);
        }
    }
}
