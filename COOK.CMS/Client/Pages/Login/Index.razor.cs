using System.Threading.Tasks;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using COOK.CMS.Client.Constants;
using COOK.CMS.Shared.ViewModels;
using COOK.CMS.Shared.Models;
using COOK.CMS.Shared.Dtos.Requests;

namespace COOK.CMS.Client.Pages.Login
{
    public partial class Index
    {
        public LoginRequest _loginRequest { get; set; } = new LoginRequest();
        [Inject]
        public PageCommon _pageCommon { get; set; }

        private string _error { get; set; }

        public async Task Login()
        {           
            var response = await Apis.PostAsJsonAsync<LoginRequest>("api/login", _loginRequest);
            var user = await response.Content.ReadFromJsonAsync<User>();
            if (response == null || !response.IsSuccessStatusCode)
            {
                _error = "Tài khoản hoặc mật khẩu không tồn tại!";
            }
            SessionInfo sessionInfo = new SessionInfo();
            sessionInfo.User = user;

            //if (_loginForm.IsRemember)
            //{

            //}

            await Session.RemoveItemAsync(AppConstant.SESSION_LOGIN);
            await Session.SetItemAsync<SessionInfo>(AppConstant.SESSION_LOGIN, sessionInfo);
            await Javascript.InvokeVoidAsync("redirect", "index2.html");
        }
    }
}
