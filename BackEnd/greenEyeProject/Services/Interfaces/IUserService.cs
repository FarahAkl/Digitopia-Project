using greenEyeProject.DTOs.User_DTOs;

namespace greenEyeProject.Services.Interfaces
{
    public interface IUserService
    {
        // User methods
        Task<UserDto> GetProfileAsync(int userId);
        Task<string> EditProfileAsync(int userId, EditProfileDto dto);

        
    }
}
