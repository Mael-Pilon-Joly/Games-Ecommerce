using AuthService.Dto;
using AuthService.Models;
using AuthService.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {

        private readonly UserManager<ECommerceUser> _userManager;
        private readonly SignInManager<ECommerceUser> _signInManager;
        private AuthServices _authService;

        public AuthController(UserManager<ECommerceUser> userManager, SignInManager<ECommerceUser> signInManager, AuthServices authService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _authService = authService;

        }


        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = new ECommerceUser { UserName = model.Username, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new { success = true, message = "User created" });
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] LoginDto model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, false, lockoutOnFailure: false);
            if (!result.Succeeded) return Unauthorized("Invalid credentials");

            var user = await _userManager.FindByNameAsync(model.Username);
            var token = _authService.GenerateJwtToken(user);

            return Ok(new { token });

        }

        // Check if username is unique
        [HttpGet("check-username")]
        public async Task<IActionResult> CheckUsername([FromQuery] string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user != null)
            {
                return Ok(new { isUnique = false, message = "Username is already taken" });
            }
            return Ok(new { isUnique = true, message = "Username is available" });
        }

        // Check if email is unique
        [HttpGet("check-email")]
        public async Task<IActionResult> CheckEmail([FromQuery] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                return Conflict(new { isUnique = false, message = "Email is already registered" });
            }
            return Ok(new { isUnique = true, message = "Email is available" });
        }
    }
}
