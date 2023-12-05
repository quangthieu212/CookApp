using AutoMapper;
using COOK.CMS.Business.Services.IServices;
using COOK.CMS.Shared;
using COOK.CMS.Shared.Models;
using COOK.CMS.Shared.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;

namespace COOK.CMS.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService { get; set; }
        private readonly IMapper _mapper;


        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult Insert(UserForm userForm)
        {
            return Ok();
        }


        [HttpPost]
        [Route("CheckExists")]
        public bool CheckExists([FromForm] string user_id)
        {
            var user = _userService.FindByUserName(user_id);
            if (user == null)
            {
                return true;
            }
            return false;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(LoginForm loginForm)
        {
            ResponseForm model = new ResponseForm();
            var user = _userService.FindByUserName(loginForm.UserName);
            if (user == null)
            {
                model.Status = 1;
                model.Data = null;
                return Ok(model);
            }
            var checkPassword = Utils.Verify(loginForm.Password, user.user_pass);
            if (!checkPassword)
            {
                model.Status = 1;
                model.Data = null;
                return Ok(model);
            }
            model.Status = 0;
            model.Data = Newtonsoft.Json.JsonConvert.SerializeObject(user);
            return Ok(model);
        }

    }
}
