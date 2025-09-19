using System.ComponentModel.DataAnnotations;

namespace greenEyeProject.DTOs.Auth_DTOs
{
    public class RegisterRequestDto
    {
        [Required] public string Name { get; set; }
        [Required] public string Email { get; set; }
        [Required] public string Password { get; set; }
        [Required] public string PhoneNumber { get; set; }
        public string? ProfileImageUrl { get; set; }
        public string? Location { get; set; }
    }
}
