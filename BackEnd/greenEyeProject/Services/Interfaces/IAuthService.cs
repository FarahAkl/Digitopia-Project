using greenEyeProject.DTOs.Auth_DTOs;

namespace greenEyeProject.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterRequestDto dto);
        Task<string> VerifyEmailAsync(string email, string token);
        Task<AuthResponseDto> LoginAsync(LoginRequestDto dto);
        Task<string> LogoutAsync(int userId);
        Task<string> ChangePasswordAsync(ChangePasswordRequestDto dto);
        Task<string> DeleteAccountAsync(int userId);
        Task<string> ForgotPasswordAsync(string email);
        Task<string> ResetPasswordAsync(ResetPasswordRequestDto dto);


    }
}
