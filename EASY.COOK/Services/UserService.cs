using EASY.COOK.Services.IService;
using EASY.COOK.Share.Dtos.Responses;
using EASY.COOK.Shared;
using EASY.COOK.Shared.Dtos.Requests;
using EASY.COOK.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace EASY.COOK.Services
{
    public class UserService: IUserService
    {
        private readonly EasyContext _context;

        private readonly IFileStorageService _fileStorageService;
        public UserService(EasyContext eContext, IFileStorageService fileStorageService) 
        { 
            _context = eContext;
            _fileStorageService = fileStorageService;
        }
        public ApiResponse<User> Register(UserRequest userRequest, IFormFile? files, IFormFile? files1)
        {
            ApiResponse<User> response = new ApiResponse<User>();
            response.isSuccess = true;
            response.Code = StatusCodes.Status200OK.ToString();
            //validate data
            var existingUser = _context.User.AsQueryable().Where(o => o.user_id != userRequest.user_id).FirstOrDefault();
            if (existingUser != null)
            {
                response.isSuccess = false;
                response.Message = Constants.Confict_Message + existingUser.user_name;
                response.Code = StatusCodes.Status409Conflict.ToString();
                response.Data = existingUser;
                return response;
            }
            //mapping data
            var user = new User();
            user.grp_id = userRequest.grp_id;
            user.user_id = userRequest.user_id;
            if (!string.IsNullOrEmpty(userRequest.user_pass))
            {
                user.user_pass = Utils.HashPassword(userRequest.user_pass);
            }
            user.user_name = userRequest.user_name;
            user.user_birth = userRequest.user_birth;
            user.user_gender = userRequest.user_gender;
            user.user_address = userRequest.user_address;
            user.user_email = userRequest.user_email;
            user.user_phone = userRequest.user_phone;
            user.user_image = userRequest.user_image;
            user.user_status = userRequest.user_status;
            user.create_date = DateTime.Now;
            //save data
            _context.User.Add(user);
            _context.SaveChanges();
            //file process
            if (files != null)
            {
                var res = _fileStorageService.uploadFile(files, user.id, userRequest.uploadDir != null ? userRequest.uploadDir : "");
                if (res != null)
                {
                    user.user_image = res.fileDownloadUri;
                    _context.User.Update(user);
                    _context.SaveChanges();
                }
            }
            response.Data = user;
            return response;
        }
 
        public ApiResponse<User> UpdateUser(long id, UserRequest userRequest, IFormFile? files, IFormFile? files1)
        {
            ApiResponse<User> response = new ApiResponse<User>();
            response.isSuccess = true;
            response.Code = StatusCodes.Status200OK.ToString();
            var updateUser = _context.User.AsQueryable().Where(o => o.id == id).FirstOrDefault();
            if (updateUser != null)
            {
                //file process
                if (files != null)
                {
                    var res = _fileStorageService.uploadFile(files, id, userRequest.uploadDir != null ? userRequest.uploadDir : "");
                    if (res != null)
                    {
                        updateUser.user_image = res.fileDownloadUri;
                    }
                }
                //mapping data
                if (!string.IsNullOrEmpty(userRequest.user_pass))
                {
                    updateUser.user_pass = Utils.HashPassword(userRequest.user_pass);
                }
                updateUser.grp_id = userRequest.grp_id != null ? userRequest.grp_id : updateUser.grp_id;
                updateUser.user_name = userRequest.user_name != null ? userRequest.user_name : updateUser.user_name;
                updateUser.user_birth = userRequest.user_birth != null ? userRequest.user_birth : updateUser.user_birth;
                updateUser.user_gender = userRequest.user_gender != null ? userRequest.user_gender : updateUser.user_gender;
                updateUser.user_address = userRequest.user_address != null ? userRequest.user_address : updateUser.user_address;
                updateUser.user_phone = userRequest.user_phone != null ? userRequest.user_phone : updateUser.user_phone;
                updateUser.user_email = userRequest.user_email != null ? userRequest.user_email : updateUser.user_email;
                updateUser.user_status = userRequest.user_status != null ? userRequest.user_status : updateUser.user_status;
                updateUser.update_date = DateTime.Now;
                //save data
                _context.User.Update(updateUser);
                _context.SaveChanges();
                response.Message = Constants.Edit_Success_Message;
                response.Data = updateUser;
            }
            else
            {
                response.isSuccess = false;
                response.Message = Constants.NotFound_Message + userRequest.user_id;
                response.Code = StatusCodes.Status404NotFound.ToString();
            }
            return response;
        }
        
        public Boolean DelUser(long id)
        {
            var delUser = _context.User.AsQueryable().Where(o => o.id == id).FirstOrDefault();
            if (delUser == null)
            {
                return false;
            } 
            else
            {
                _context.User.Remove(delUser);
                var save = _context.SaveChanges();
                if(save < 1)
                {
                    return false;
                }
            }
            return true;
        }
        
        public ApiResponse<User> Login(LoginRequest loginRequest)
        {
            ApiResponse<User> response = new ApiResponse<User>();
            response.isSuccess = true;
            response.Code = StatusCodes.Status200OK.ToString();
            //validate data
            var existingUser = _context.User.AsQueryable().Where(o => o.user_id == loginRequest.user_id).FirstOrDefault();
            if (existingUser != null)
            {
                if (!Utils.Verify(loginRequest.user_pass, existingUser.user_pass))
                {
                    response.isSuccess = false;
                    response.Message = Constants.Login_Fail_Message;
                    response.Code = StatusCodes.Status400BadRequest.ToString();
                    response.Data = existingUser;
                    return response;
                }
            }
            else
            {
                response.isSuccess = false;
                response.Message = Constants.NotFound_Message + loginRequest.user_id;
                response.Code = StatusCodes.Status404NotFound.ToString();
                return response;
            }
            //mapping data
            response.Message = Constants.Login_Success_Message;
            response.Data = existingUser;
            return response;
        }

        public PagedResponse<List<User>> Users(string type, RequestFilters filter, string softField, string softType)
        {
            List<User> Users = _context.User.AsQueryable().Where(o => o != null).ToList();
            if(type != null && !Constants.TYPE_ALL_FILTER.Equals(type))
            {
                var grp = _context.UserGroup.AsQueryable().Where(g => g != null && type.Equals(g.grp_type)).ToList();
                Users = _context.User.AsQueryable().Where(o => grp != null && grp.Where(gr => gr.id == o.grp_id).Count() > 0).ToList();
            }    
            //fiter by condition
            if (filter != null)
            {
                if (filter.Filters != null && filter.Filters.Count > 0)
                {
                    foreach (Item item in filter.Filters)
                    {
                        if (item.value == null || ("string".Equals(item.key)  && "string".Equals(item.value)) || "".Equals(item.value))
                            continue;
                        Users = Users.Where(o => o.id == (item.value.All(char.IsNumber) ? long.Parse(item.value) : 0)
                        || (o.user_id != null && o.user_id.Contains(item.value))
                        || (o.user_name != null && o.user_name.Contains(item.value))
                        || (o.user_address != null && o.user_address.Contains(item.value))
                        || (o.user_phone != null && o.user_phone.Contains(item.value))
                        || (o.user_email != null && o.user_email.Contains(item.value))
                        ).ToList();
                    }
                }    
            }
            //sorter 
            if (softType != null)
            {
                if (softType.Equals(Constants.ODER_ASC))
                {
                    switch (softField.ToLower())
                    {
                        case "id":
                            Users = Users.OrderBy(n => n.id).ToList();
                            break;
                        case "user_id":
                            Users = Users.OrderBy(n => n.user_id).ToList();
                            break;
                        case "user_name":
                            Users = Users.OrderBy(n => n.user_name).ToList();
                            break;
                        case "user_phone":
                            Users = Users.OrderBy(n => n.user_phone).ToList();
                            break;
                        case "user_birth":
                            Users = Users.OrderBy(n => n.user_birth).ToList();
                            break;
                        case "user_gender":
                            Users = Users.OrderBy(n => n.user_gender).ToList();
                            break;
                        case "user_address":
                            Users = Users.OrderBy(n => n.user_address).ToList();
                            break;
                        case "user_email":
                            Users = Users.OrderBy(n => n.user_email).ToList();
                            break;
                        default:
                            Users = Users.OrderBy(n => n.id).ToList();
                            break;
                    }
                }
                else
                {
                    switch (softField.ToLower())
                    {
                        case "id":
                            Users = Users.OrderByDescending(n => n.id).ToList();
                            break;
                        case "user_id":
                            Users = Users.OrderByDescending(n => n.user_id).ToList();
                            break;
                        case "user_name":
                            Users = Users.OrderByDescending(n => n.user_name).ToList();
                            break;
                        case "user_phone":
                            Users = Users.OrderByDescending(n => n.user_phone).ToList();
                            break;
                        case "user_birth":
                            Users = Users.OrderByDescending(n => n.user_birth).ToList();
                            break;
                        case "user_gender":
                            Users = Users.OrderByDescending(n => n.user_gender).ToList();
                            break;
                        case "user_address":
                            Users = Users.OrderByDescending(n => n.user_address).ToList();
                            break;
                        case "user_email":
                            Users = Users.OrderByDescending(n => n.user_email).ToList();
                            break;
                        default:
                            Users = Users.OrderByDescending(n => n.id).ToList();
                            break;
                    }
                }    
            }
            //paging
            int totalrow = Users.Count;
            List<User> results = new List<User>();
            var takeSize = filter?.PageSize != 0 ? Convert.ToInt32(filter?.PageSize) : 10;// i.e. ItemsPerPage = 10
            var skipSize = filter?.PageNumber != 0 ? Convert.ToInt32(filter?.PageNumber) : 0;
            results = Users.Skip(skipSize).Take(takeSize).ToList();
            var jsonData = new PagedResponse<List<User>>(results, skipSize, takeSize, totalrow);
            jsonData.Code = StatusCodes.Status200OK.ToString();
            jsonData.Message = "";
            return jsonData;
        }
        
        public ApiResponse<User> getById(long id)
        {
            ApiResponse<User> response = new ApiResponse<User>();
            response.isSuccess = true;
            response.Code = StatusCodes.Status200OK.ToString();
            var User = _context.User.AsQueryable().Where(o => o.id == id).FirstOrDefault();
            if(User == null)
            {
                response.isSuccess = false;
                response.Message = Constants.NotFound_Message;
                response.Code = StatusCodes.Status404NotFound.ToString();
            }
            response.Data = User;
            return response;
        }
        
        public ApiResponse<User> getByUserName(string name)
        {
            ApiResponse<User> response = new ApiResponse<User>();
            response.isSuccess = true;
            response.Code = StatusCodes.Status200OK.ToString();
            var User = _context.User.AsQueryable().Where(o => o.user_id.ToLower().Equals(name.ToLower())).FirstOrDefault();
            if (User == null)
            {
                response.isSuccess = false;
                response.Message = Constants.NotFound_Message;
                response.Code = StatusCodes.Status404NotFound.ToString();
            }
            response.Data = User;
            return response;
        }
    }
}
