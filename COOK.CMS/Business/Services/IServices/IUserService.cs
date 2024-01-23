using COOK.CMS.Shared.Dtos.Requests;
using COOK.CMS.Shared.Dtos.Responses;
using COOK.CMS.Shared.Models;
using COOK.CMS.Shared.ViewModels;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace COOK.CMS.Business.Services.IServices
{
    public interface IUserService
    {

        public ApiResponse<User> Register(UserRequest userRequest, IFormFile? files);

        public ApiResponse<User> UpdateUser(long id, UserRequest userRequest, IFormFile? files);

        public Boolean DelUser(long id);

        public ApiResponse<User> Login(LoginRequest loginRequest);

        public PagedResponse<List<User>> Users(string type, RequestFilters filter, string softField, string softType);

        public ApiResponse<User> getById(long id);

        public ApiResponse<User> getByUserId(string user_id);

        public ApiResponse<User> SetUserRole(string user_id, List<long> roleids);

        public ApiResponse<UserGroup> SetGrpRole(long grp_id, List<long> roleids);
        public ApiResponse<Role> AddRole(RoleRequest roleRequest);

        public PagingResponseForm Search(PagingForm pagingForm, UserSearchForm searchForm);

    }
}
