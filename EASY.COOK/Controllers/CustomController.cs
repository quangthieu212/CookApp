using EASY.COOK.Shared;
using Microsoft.AspNetCore.Mvc;

namespace EASY.COOK.Controllers
{
    [Route(Constants.Root_Api)]
    [ApiController]
    public class CustomController : ControllerBase
    {
        protected IActionResult Convert(string code, object? obj, object? data)
        {
            if(obj == null)
            {
                return NoContent();
            }
            switch (code)
            {
                case Constants.SuccessCode:
                    return Ok(data);
                case Constants.ConflictCode:
                    return Conflict(obj);
                case Constants.BadRequestCode:
                    return BadRequest(obj);
                case Constants.NotFoundCode:
                    return NotFound(obj);
                default: return Ok(data);
            }

        }
    }
}
