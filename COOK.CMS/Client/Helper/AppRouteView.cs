using Blazored.SessionStorage;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Rendering;
using Microsoft.JSInterop;
using COOK.CMS.Client.Constants;
using COOK.CMS.Shared.ViewModels;

namespace COOK.CMS.Client.Helper
{
    public class AppRouteView : RouteView
    {
        [Inject]
        ISessionStorageService Session { get; set; }
        [Inject]
        IJSRuntime Javascript { get; set; }

        [Inject]
        NavigationManager Route { get; set; }

        protected override async void Render(RenderTreeBuilder builder)
        {
            SessionInfo session = await Session.GetItemAsync<SessionInfo>(AppConstant.SESSION_LOGIN);
            if (session == null)
            {
                await Javascript.InvokeVoidAsync("redirect", "/login");
            }
            else
            {
                base.Render(builder);
            }
        }
    }
}
