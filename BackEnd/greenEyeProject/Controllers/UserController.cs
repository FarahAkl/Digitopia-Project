using AutoMapper;
using greenEyeProject.DTOs.User_DTOs;
using greenEyeProject.Models;
using greenEyeProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using greenEyeProject.Services;

namespace greenEyeProject.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
       

        public UserController(IUserService userService)
        {
            _userService = userService;
            
        }

        [HttpGet("Profile")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null) return Unauthorized();

                var userId = int.Parse(userIdClaim.Value);
                var result = await _userService.GetProfileAsync(userId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPut("Profile")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile(EditProfileDto dto)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null) return Unauthorized();

                var userId = int.Parse(userIdClaim.Value);
                var result = await _userService.EditProfileAsync(userId, dto);

                return Ok(new { message = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

       
    }
}
