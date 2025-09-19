using AutoMapper;
using greenEyeProject.DTOs.User_DTOs;
using greenEyeProject.Models;
using greenEyeProject.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace greenEyeProject.Services
{
    public class UserService: IUserService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UserService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<UserDto> GetProfileAsync(int userId)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null) throw new Exception("User not found");

            return new UserDto
            {
                Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Location = user.Location,  
                Role = user.Role.RoleName,
                ProfileImageUrl = user.ProfileImageUrl ?? "https://example.com/default-profile.png"
            };
        }


        public async Task<string> EditProfileAsync(int userId, EditProfileDto dto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null) throw new Exception("User not found");

            if (!string.IsNullOrEmpty(dto.Name)) user.Name = dto.Name;
            if (!string.IsNullOrEmpty(dto.PhoneNumber)) user.PhoneNumber = dto.PhoneNumber;
            if (!string.IsNullOrEmpty(dto.ProfileImageUrl)) user.ProfileImageUrl = dto.ProfileImageUrl;
            if (!string.IsNullOrEmpty(dto.Email)) user.Email = dto.Email;
            if (!string.IsNullOrEmpty(dto.Location)) user.Location = dto.Location;  

            await _context.SaveChangesAsync();
            return "Profile updated successfully!";
        }




    }
}
