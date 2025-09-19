namespace greenEyeProject.DTOs.Auth_DTOs
{
    public class ResetPasswordRequestDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
