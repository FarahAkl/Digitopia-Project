using AutoMapper;
using greenEyeProject.DTOs.User_DTOs;
using greenEyeProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace greenEyeProject.Services
{
    public class AdminService : IAdminService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public AdminService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _context.Users
                .Include(u => u.Role)
                .ToListAsync(); 

            return users.Select(user => new UserDto
            {
                Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Location = user.Location, 
                Role = user.Role.RoleName,
                ProfileImageUrl = user.ProfileImageUrl ?? "https://example.com/default-profile.png"
            }).ToList();
        }

    }
}
