using AutoMapper;
using COOK.CMS.Business.Services.IServices;
using COOK.CMS.Shared;
using COOK.CMS.Shared.Dtos.Requests;
using COOK.CMS.Shared.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace COOK.CMS.Server.Controllers
{
    public class UserController : CustomController
    {
        private IUserService _userService { get; set; }
        private readonly IMapper _mapper;
        private readonly string _uploadDir;

        public UserController(IUserService userService, IMapper mapper, IConfiguration configuration)
        {
            _userService = userService;
            _mapper = mapper;
            _uploadDir = configuration.GetValue<string>("FileStorageStrings:uploadDir");
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        [Route(Constant.Register_Api)]
        public IActionResult Register([FromForm] string jsonString, IFormFile? files)
        {
            if (jsonString == null)
                return NoContent();
            UserRequest userRequest = (UserRequest)Utils.setDirUpload(jsonString, _uploadDir, nameof(UserRequest));
            var response = _userService.Register(userRequest, files);
            return Convert(response.Code, response, response.Data);
        }
        [HttpPut]
        [Consumes("multipart/form-data")]
        [Route(Constant.Update_Api)]
        public IActionResult UpdateUser(long id, [FromForm] string jsonString, IFormFile? files)
        {
            if (jsonString == null)
                return NoContent();
            UserRequest userRequest = (UserRequest)Utils.setDirUpload(jsonString, _uploadDir, nameof(UserRequest));
            var response = _userService.UpdateUser(id, userRequest, files);
            return Convert(response.Code, response, response.Data);
        }
        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route(Constant.Del_Api)]
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
        [Route(Constant.Login_Api)]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var response = _userService.Login(loginRequest);
            if (response == null || response.Data == null) return NoContent();
            return Convert(response.Code, response, response.Data);
        }
        [HttpPost]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("list")]
        public IActionResult GetUsers(string type, [FromBody] RequestFilters filter, string softField = "id", string softType = "asc")
        {
            var response = _userService.Users(type, filter, softField, softType);
            return Convert(response.Code, response, response.Data);
        }
        [HttpGet]
        [Route(Constant.GetById_Api)]
        public IActionResult GetUserById(int id)
        {
            var response = _userService.getById(id);
            return Convert(response.Code, response, response.Data);
        }
        [HttpGet]
        [Route(Constant.GetByUserId_Api)]
        public IActionResult GetUserByUserId(string user_id)
        {
            var response = _userService.getByUserId(user_id);
            return Convert(response.Code, response, response.Data);
        }
        [HttpPost]
        [Route(Constant.Add_Role_Api)]
        public IActionResult AddRole(RoleRequest request)
        {
            var response = _userService.AddRole(request);
            return Convert(response.Code, response, response.Data);
        }
        [HttpPost]
        [Route(Constant.List_Api)]
        public IActionResult GetUsers([FromForm] PagingForm pagingForm, [FromQuery] UserSearchForm searchForm)
        {
            return Ok(_userService.Search(pagingForm, searchForm));
        }
        [HttpPost]
        [Route("CheckExists")]
        public bool CheckExists([FromForm] string user_id)
        {
            var user = _userService.getByUserId(user_id);
            if (user == null || user.Data == null)
            {
                return true;
            }
            return false;
        }
    }
}
