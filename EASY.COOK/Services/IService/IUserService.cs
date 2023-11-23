﻿
using EASY.COOK.Share.Dtos.Responses;
using EASY.COOK.Shared.Dtos.Requests;
using EASY.COOK.Shared.Models;

namespace EASY.COOK.Services.IService
{
    public interface IUserService
    {
        public ApiResponse<User> Register(UserRequest userRequest, IFormFile? files, IFormFile? files1);

        public ApiResponse<User> UpdateUser(long id, UserRequest userRequest, IFormFile? files, IFormFile? files1);

        public Boolean DelUser(long id);

        public ApiResponse<User> Login(LoginRequest loginRequest);

        public PagedResponse<List<User>> Users(string type, RequestFilters filter, string softField, string softType);

        public ApiResponse<User> getById(long id);

        public ApiResponse<User> getByUserName(string name);


    }
}