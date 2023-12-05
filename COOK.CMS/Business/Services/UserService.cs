using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using COOK.CMS.API.Infrastructure.Exceptions;
using COOK.CMS.Business.Services.IServices;
using COOK.CMS.Shared;
using COOK.CMS.Shared.Dtos.Requests;
using COOK.CMS.Shared.Models;

namespace COOK.CMS.Business.Services
{
    public class UserService :  IUserService
    {
        private readonly IMapper _mapper;
        private readonly FContext _context;
        public UserService(
            FContext settings,
            IMapper mapper
            )  {
            _mapper = mapper;
            _context = settings;
        }


        public User NewUser(UserRegistrationRequest request)
        {
            var user = new User();
            return user;
        }

        public User FindUserCredentials(UserLoginRequest user)
        {
            var userid = user.user_id;
            var password = user.user_pass;
            var existingUser = _context.user.AsQueryable().Where(u => u.user_id == userid).FirstOrDefault();
            if (existingUser == null || !Utils.Verify(password, existingUser.user_pass))
            {
                throw new PlatformException("userid or password is incorrect");
            }
            return existingUser;
        }

        public User UpdateNotPassword(User user)
        {
            return user;
        }

        public User FindByUserName(string userId)
        {
            return _context.user.AsQueryable().Where(u => u.user_id == userId).FirstOrDefault();
        }
        public List<User> FindAll()
        {
            return _context.user.AsQueryable().Where(u => u != null).ToList();
        }
    }
}
