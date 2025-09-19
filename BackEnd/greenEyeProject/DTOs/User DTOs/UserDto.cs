namespace greenEyeProject.DTOs.User_DTOs
{
    public class UserDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public string? Location { get; set; }  
        public string Role { get; set; }
        public string? ProfileImageUrl { get; set; }
    }
}
