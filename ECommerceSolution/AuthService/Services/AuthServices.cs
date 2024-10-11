using AuthService.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthService.Services
{
    public class AuthServices
    {
        private readonly IConfiguration _configuration;

        public AuthServices(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateJwtToken(ECommerceUser user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, user.UserName), // User's username
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Unique identifier for the token
        new Claim(ClaimTypes.NameIdentifier, user.Id) // User's ID
    };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(1), // Token expiration time
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
