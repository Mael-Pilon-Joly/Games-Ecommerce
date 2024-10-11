using AuthService.Dto;
using AuthService.Models;
using AuthService.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
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

            if (result.Succeeded) return Ok("User created");
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


    }
}
