using greenEyeProject.DTOs.User_DTOs;

namespace greenEyeProject.Services.Interfaces
{
    public interface IAdminService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
    }
}
