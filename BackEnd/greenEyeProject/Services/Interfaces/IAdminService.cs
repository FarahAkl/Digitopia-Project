using greenEyeProject.DTOs.User_DTOs;

namespace greenEyeProject.Services.Interfaces
{
    public interface IAdminService
    {
        // Admin methods
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
    }
}
