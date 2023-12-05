using System;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;

namespace COOK.CMS.API.Infrastructure.Filters
{
    public class CustomExceptionFilter: IExceptionFilter
    {
        public CustomExceptionFilter()
        {
        }

        public void OnException(ExceptionContext context)
        {
            var status = HttpStatusCode.InternalServerError;
            var message = context.Exception.Message;

            context.ExceptionHandled = true;

            var response = context.HttpContext.Response;
            response.StatusCode = (int)status;
            response.ContentType = "application/json";
            response.WriteAsync(new
            {
                ErrorCode = (int)status,
                ErrorMessage = message
            }.ToString());
        }
    }
}
