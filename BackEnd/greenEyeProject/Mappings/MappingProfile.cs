using AutoMapper;
using greenEyeProject.DTOs.Auth_DTOs;
using greenEyeProject.DTOs.User_DTOs;
using greenEyeProject.Models;

namespace GreenEye.API.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // ========================
            // User → UserDto
            // ========================
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.RoleName))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location)); 

            // ========================
            // RegisterRequestDto → User
            // ========================
            CreateMap<RegisterRequestDto, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()); // هنعمله Hash جوه Service
        }
    }
}
