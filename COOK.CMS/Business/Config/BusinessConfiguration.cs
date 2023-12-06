using COOK.CMS.Business.Services.IServices;
using COOK.CMS.Business.Services;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class BusinessConfiguration
    {
        public static IServiceCollection DbConfigure(this IServiceCollection services, IConfiguration configuration)
        {
            return services;
        }
        public static IServiceCollection AddBusinessServices(this IServiceCollection services)
        {
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IFileStorageService, FileStorageService>();
            return services;
        }
    }
}
