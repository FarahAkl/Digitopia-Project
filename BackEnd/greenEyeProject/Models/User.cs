using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace greenEyeProject.Models
{
    public class User
    {
        public int UserId { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required, MaxLength(150)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public string? ProfileImageUrl { get; set; }

        [MaxLength(20)]
        public string PhoneNumber { get; set; }

        [MaxLength(250)]
        public string? Location { get; set; }  // بدل جدول Location

        public DateTime CreatedAt { get; set; }

        // Foreign Key
        public int RoleId { get; set; }
        public Role Role { get; set; }


        public bool IsEmailVerified { get; set; } = false;
        public string? EmailVerificationToken { get; set; }
        public DateTime? EmailVerificationTokenExpiry { get; set; }


        // 🔹 New fields for reset password
        public string? ResetToken { get; set; }
        public DateTime? ResetTokenExpiry { get; set; }

        // Navigation
        public ICollection<Report> Reports { get; set; } = new List<Report>();
    }
}
