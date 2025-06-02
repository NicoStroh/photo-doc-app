using Microsoft.AspNetCore.Mvc;
using PhotoDocApi.Services;

namespace PhotoDocApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;

        public AuthController(UserService userService)
        {
            _userService = userService;
        }

        public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var success = await _userService.LoginAsync(request.Username, request.Password);
            if (!success)
                return Unauthorized("Falsches Passwort.");

            return Ok(new { token = "mock-token", username = request.Username });
        }

    }
}
