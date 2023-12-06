using COOK.CMS.Shared;
using Microsoft.AspNetCore.Mvc;

namespace COOK.CMS.Server.Controllers
{
    [Route(Constant.Root_Api)]
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
                case Constant.SuccessCode:
                    return Ok(data);
                case Constant.ConflictCode:
                    return Conflict(obj);
                case Constant.BadRequestCode:
                    return BadRequest(obj);
                case Constant.NotFoundCode:
                    return NotFound(obj);
                default: return Ok(data);
            }

        }
    }
}
