using System.ComponentModel.DataAnnotations;

namespace greenEyeProject.DTOs.Auth_DTOs
{
    public class LoginRequestDto
    {
        [Required] public string Email { get; set; }
        [Required] public string Password { get; set; }
    }
}
