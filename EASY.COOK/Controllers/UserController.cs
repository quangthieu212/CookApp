
using EASY.COOK.Infrastructure.Jwt;
using EASY.COOK.Services.IService;
using EASY.COOK.Share.Dtos.Responses;
using EASY.COOK.Shared;
using EASY.COOK.Shared.Dtos;
using EASY.COOK.Shared.Dtos.Requests;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EASY.COOK.Controllers
{
    public class UserController : CustomController
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly IJwtAuthManager _jwtAuthManager;
        public UserController(IUserService userService, IJwtAuthManager jwtAuthManager, IConfiguration configuration)
        {
            _userService = userService;
            _jwtAuthManager = jwtAuthManager;
            _configuration = configuration;
        }
        [HttpPost]
        [Route(Constants.Register_Api)]
        public IActionResult Register([FromForm] string jsonString, IFormFile? files)
        {
            if (jsonString == null)
                return NoContent();
            UserRequest userRequest = (UserRequest)Utils.setDirUpload(jsonString, _configuration, nameof(UserRequest));
            var response = _userService.Register(userRequest, files);
            return Convert(response.Code, response, response.Data);
        }
        [HttpPut]
        [Route(Constants.Update_Api)]
        public IActionResult UpdateUser(long id, [FromForm] string jsonString, IFormFile? files)
        {
            if (jsonString == null)
                return NoContent();
            UserRequest userRequest = (UserRequest)Utils.setDirUpload(jsonString, _configuration, nameof(UserRequest));
            var response = _userService.UpdateUser(id, userRequest, files);
            return Convert(response.Code, response, response.Data);
        } 
        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route(Constants.Del_Api)]
        public IActionResult Delete(long id)
        {
            bool delState = _userService.DelUser(id);
            if (!delState)
            {
                return BadRequest();
            }
            return NoContent();
        }
        [HttpPost]
        [Route(Constants.Login_Api)]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var response = _userService.Login(loginRequest);
            if(response == null || response.Data == null) return NoContent();
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, loginRequest.user_id),
            };
            var jwtResult = _jwtAuthManager.GenerateTokens(loginRequest.user_id, claims, DateTime.Now);
            var sroles = "";
            if(response.Data.roles != null) {
                foreach (var role in response.Data.roles)
                {
                    sroles = string.Concat(sroles, role.rol_name, ",");
                }
            }
            var authRes = new AuthResponse
            {
                UserName = loginRequest.user_id,
                DisplayName = response?.Data?.user_name,
                Role = sroles,
                AccessToken = jwtResult.AccessToken,
                RefreshToken = jwtResult.RefreshToken.TokenString,
            };
            return Ok(ApiResponse<AuthResponse>.Success(authRes));
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route(Constants.List_Api)]
        public IActionResult GetUsers(string type, [FromBody] RequestFilters filter, string softField = "id", string softType = "asc")
        {
            var response = _userService.Users(type, filter, softField, softType);
            return Convert(response.Code, response, response.Data);
        }
        [HttpGet]
        [Route(Constants.GetById_Api)]
        public IActionResult GetUserById(int id)
        {
            var response = _userService.getById(id);
            return Convert(response.Code, response, response.Data);
        }
        [HttpGet]
        [Route(Constants.GetByName_Api)]
        public IActionResult GetUserByName(string name)
        {
            var response = _userService.getByUserName(name);
            return Convert(response.Code, response, response.Data);
        }
        [HttpPost]
        [Route(Constants.Add_Role_Api)]
        public IActionResult AddRole(RoleRequest request)
        {
            var response = _userService.AddRole(request);
            return Convert(response.Code, response, response.Data);
        }
    }
}
