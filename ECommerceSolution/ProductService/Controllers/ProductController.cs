using Microsoft.AspNetCore.Mvc;

namespace ProductService.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
