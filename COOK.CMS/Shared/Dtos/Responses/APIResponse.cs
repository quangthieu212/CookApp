using System;
namespace COOK.CMS.Shared.Dtos.Responses
{
    public class ApiResponse<T>
    {
        public T Data { get; set; }
        public string Message { get; set; }
        public string Code { get; set; }
        public bool isSuccess { get; set; }

        public static ApiResponse<T> Fail(string errorMessage, string errorCode)
        {
            return new ApiResponse<T> { Message = errorMessage, Code = errorCode, isSuccess = false };
        }

        public static ApiResponse<T> Fail(string errorMessage)
        {
            return new ApiResponse<T> { Message = errorMessage, isSuccess = false };
        }

        public static ApiResponse<T> Success(T data)
        {
            return new ApiResponse<T> { Data = data, isSuccess = true };
        }
    }
}
