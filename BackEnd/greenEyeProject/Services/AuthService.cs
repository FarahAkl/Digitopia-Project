using greenEyeProject.DTOs.Auth_DTOs;
using greenEyeProject.Models;
using greenEyeProject.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;

namespace greenEyeProject.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<AuthService> _logger;

        public AuthService(AppDbContext context, IConfiguration configuration, IWebHostEnvironment env, ILogger<AuthService> logger)
        {
            _context = context;
            _configuration = configuration;
            _env = env;
            _logger = logger;
        }


        public async Task<string> RegisterAsync(RegisterRequestDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                _logger.LogWarning("Registration failed: Email {Email} already exists.", dto.Email);
                throw new InvalidOperationException("Email already exists.");
            }

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                ProfileImageUrl = dto.ProfileImageUrl ?? "https://example.com/default-profile.png",
                Location = dto.Location,
                RoleId = 2, // User role
                CreatedAt = DateTime.UtcNow,
                IsEmailVerified = false,
                EmailVerificationToken = Guid.NewGuid().ToString(),
                EmailVerificationTokenExpiry = DateTime.UtcNow.AddHours(24) 
            };

           
            var passwordHasher = new PasswordHasher<User>();
            user.PasswordHash = passwordHasher.HashPassword(user, dto.Password);

            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var verificationLink =
                    $"{_configuration["AppSettings:BackendUrl"]}/api/auth/VerifyEmail?token={user.EmailVerificationToken}&email={user.Email}";

                var smtpHost = _configuration["Smtp:Host"];
                var smtpPort = int.Parse(_configuration["Smtp:Port"]);
                var smtpEmail = _configuration["Smtp:Email"];
                var smtpPassword = _configuration["Smtp:Password"];

                var fromAddress = new MailAddress(smtpEmail, "GreenEye Support");
                var toAddress = new MailAddress(user.Email);
                string subject = "Verify your email - GreenEye";
                string body =
                    $"Hi {user.Name},\n\nPlease verify your email by clicking the link below:\n{verificationLink}\n\nThis link expires in 24 hours.";

                using (var smtp = new SmtpClient(smtpHost, smtpPort))
                {
                    smtp.Credentials = new NetworkCredential(smtpEmail, smtpPassword);
                    smtp.EnableSsl = true;

                    using (var message = new MailMessage(fromAddress, toAddress)
                    {
                        Subject = subject,
                        Body = body
                    })
                    {
                        await smtp.SendMailAsync(message);
                    }
                }

                _logger.LogInformation("User {Email} registered successfully. Verification email sent.", user.Email);

                return "User registered successfully! Please check your email to verify your account.";
            }
            catch (SmtpException smtpEx)
            {
                _logger.LogError(smtpEx, "SMTP error while sending verification email to {Email}", user.Email);
                throw new ApplicationException("Failed to send verification email. Please try again later.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error during registration for {Email}", user.Email);
                throw;
            }
        }


        public async Task<string> VerifyEmailAsync(string email, string token)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    _logger.LogWarning("Email verification failed: User with email {Email} not found.", email);
                    throw new KeyNotFoundException("User not found.");
                }

                if (user.IsEmailVerified)
                {
                    _logger.LogInformation("User {Email} already verified. Redirecting to login.", email);
                    return GetFrontendUrl("/login");
                }

                if (user.EmailVerificationToken != token || user.EmailVerificationTokenExpiry < DateTime.UtcNow)
                {
                    _logger.LogWarning("Invalid or expired verification token for user {Email}", email);
                    throw new UnauthorizedAccessException("Invalid or expired verification token.");
                }

                user.IsEmailVerified = true;
                user.EmailVerificationToken = null;
                user.EmailVerificationTokenExpiry = null;

                await _context.SaveChangesAsync();

                _logger.LogInformation("User {Email} verified successfully.", email);

                return GetFrontendUrl("/login");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while verifying email {Email}", email);
                throw;
            }
        }


        private string GetFrontendUrl(string path)
        {
            var frontendUrls = _configuration.GetSection("AppSettings:FrontendUrls").Get<string[]>();
            if (frontendUrls == null || frontendUrls.Length == 0)
            {
                _logger.LogError("Frontend URLs are not configured.");
                throw new ApplicationException("No FrontendUrls configured.");
            }

            string baseUrl;

            if (_env.IsDevelopment())
            {
                baseUrl = frontendUrls.FirstOrDefault(u => u.Contains("localhost"))
                          ?? frontendUrls.First();
            }
            else
            {
                baseUrl = frontendUrls.FirstOrDefault(u => !u.Contains("localhost"))
                          ?? frontendUrls.First();
            }

            return $"{baseUrl}{path}";
        }





        public async Task<AuthResponseDto> LoginAsync(LoginRequestDto dto)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null)
                throw new Exception("Invalid email or password");

            if (!user.IsEmailVerified)
                throw new Exception("Please verify your email before logging in");

            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);

            if (result == PasswordVerificationResult.Failed)
                throw new Exception("Invalid email or password");

            var token = GenerateJwtToken(user);

            return new AuthResponseDto
            {
                Token = token,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role.RoleName
            };
        }

        public async Task<string> LogoutAsync(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user == null)
                throw new Exception("User not found");

            return "User logged out successfully!";
        }

        public async Task<string> DeleteAccountAsync(int userId)
        {
            var user = await _context.Users
                .Include(u => u.Reports) 
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null)
                throw new Exception("User not found");

            _context.Reports.RemoveRange(user.Reports);

            var notifications = _context.Notifications.Where(n => n.UserId == userId);
            _context.Notifications.RemoveRange(notifications);

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return "Account deleted successfully";
        }

        public async Task<string> ChangePasswordAsync(ChangePasswordRequestDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
                throw new Exception("User not found");

            var passwordHasher = new PasswordHasher<User>();
            var verificationResult = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.OldPassword);
            if (verificationResult == PasswordVerificationResult.Failed)
                throw new Exception("Old password is incorrect");

            user.PasswordHash = passwordHasher.HashPassword(user, dto.NewPassword);
            await _context.SaveChangesAsync();

            return "Password changed successfully";
        }



        //  Forgot Password
        public async Task<string> ForgotPasswordAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                throw new Exception("This email is not registered");

            var token = Guid.NewGuid().ToString();
            user.ResetToken = token;
            user.ResetTokenExpiry = DateTime.UtcNow.AddHours(1);
            await _context.SaveChangesAsync();

            var frontendUrls = _configuration.GetSection("AppSettings:FrontendUrls").Get<string[]>();
            var backendUrl = _configuration.GetValue<string>("AppSettings:BackendUrl");

            string frontendUrl;
            if (backendUrl.Contains("localhost"))
            {
                frontendUrl = frontendUrls.FirstOrDefault(u => u.Contains("localhost"));
            }
            else
            {
                frontendUrl = frontendUrls.FirstOrDefault(u => !u.Contains("localhost"));
            }

            frontendUrl ??= frontendUrls.First();

            var resetLink = $"{frontendUrl}/resetPassword?token={WebUtility.UrlEncode(token)}&email={user.Email}";

            var smtpHost = _configuration["Smtp:Host"];
            var smtpPort = int.Parse(_configuration["Smtp:Port"]);
            var smtpEmail = _configuration["Smtp:Email"];
            var smtpPassword = _configuration["Smtp:Password"];

            var fromAddress = new MailAddress(smtpEmail, "Supporter");
            var toAddress = new MailAddress(user.Email);
            string subject = "Password Reset - GreenEye";
            string body = $@"Click the link below to reset your password: 
            <a href=""{resetLink}"">Reset Password</a>";

            using (var smtp = new SmtpClient(smtpHost, smtpPort))
            {
                smtp.Credentials = new NetworkCredential(smtpEmail, smtpPassword);
                smtp.EnableSsl = true;

                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                })
                {
                    await smtp.SendMailAsync(message);
                }
            }

            return "Password reset link has been sent to your email";
        }

        //  Reset Password
        public async Task<string> ResetPasswordAsync(ResetPasswordRequestDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
                throw new Exception("This email is not registered");

            if (user.ResetToken != dto.Token || user.ResetTokenExpiry < DateTime.UtcNow)
                throw new Exception("Invalid or expired reset token");

            var passwordHasher = new PasswordHasher<User>();
            user.PasswordHash = passwordHasher.HashPassword(user, dto.NewPassword);

            user.ResetToken = null;
            user.ResetTokenExpiry = null;

            await _context.SaveChangesAsync();

            return "Password has been reset successfully";
        }


        //  Generate JWT token
        private string GenerateJwtToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role.RoleName)
    };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
        }



    }
}
