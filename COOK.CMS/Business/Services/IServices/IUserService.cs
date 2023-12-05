using COOK.CMS.Shared.Dtos.Requests;
using COOK.CMS.Shared.Models;
using System.Collections.Generic;

namespace COOK.CMS.Business.Services.IServices
{
    public interface IUserService
    {
        public User NewUser(UserRegistrationRequest request);
        public User FindUserCredentials(UserLoginRequest user);
        public User UpdateNotPassword(User user);
        public User FindByUserName(string userId);
        public List<User> FindAll();

    }
}
