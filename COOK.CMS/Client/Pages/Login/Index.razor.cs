using System.Threading.Tasks;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using COOK.CMS.Client.Constants;
using COOK.CMS.Shared.ViewModels;
using COOK.CMS.Shared.Models;

namespace COOK.CMS.Client.Pages.Login
{
    public partial class Index
    {
        public LoginForm _loginForm { get; set; } = new LoginForm();
        [Inject]
        public PageCommon _pageCommon { get; set; }

        private string _error { get; set; }
        public async Task Init()
        {
            /*await _pageCommon._module.InvokeVoidAsync("IsValidate");*/
        }

        public async Task Login()
        {           
            var response = await Apis.PostAsJsonAsync<LoginForm>("api/User/Login", _loginForm);
            var resForm = await response.Content.ReadFromJsonAsync<ResponseForm>();
            if (resForm.Status == 1)
            {
                _error = "Tài khoản hoặc mật khẩu không tồn tại!";
            }
            var user = JsonConvert.DeserializeObject<User>(resForm.Data.ToString());
            SessionInfo sessionInfo = new SessionInfo();
            sessionInfo.User = user;

            if (_loginForm.IsRemember)
            {

            }

            await Session.RemoveItemAsync(AppConstant.SESSION_LOGIN);
            await Session.SetItemAsync<SessionInfo>(AppConstant.SESSION_LOGIN, sessionInfo);
            await Javascript.InvokeVoidAsync("redirect", "/");
        }
    }
}
