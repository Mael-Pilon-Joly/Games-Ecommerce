using System.ComponentModel.DataAnnotations;

namespace AuthService.Dto
{
    public class LoginDto
    {
        [Required]
        public String Username { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long.")]
        [DataType(DataType.Password)]
        public String Password { get; set; }

    }
}
