using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace COOK.CMS.Client.Pages.Users
{
    public partial class List
    {
        [Inject]
        private PageCommon _page { get; set; }
        public string uri { get; set; }

        private void AddNew()
        {
            Route.NavigateTo("/User/action");
        }
        public async Task Init()
        {
            await _page.InitSearchList<Users.List>(this);
        }

        public async Task Search()
        {
            await _page.CallJS("searchForm");
        }

        [JSInvokable]
        public async Task Delete(string id)
        {
            bool confirm = await _page.JS.InvokeAsync<bool>("showConfirm", "");
            if (confirm)
            {
                var response = await _page.Http.DeleteAsync("" + id);
                if (response.IsSuccessStatusCode)
                {
                    await _page.CallJS("alertSuccess", new string[1] { "" });
                    await Search();
                }

            }

        }

        [JSInvokable]
        public void Edit(string id)
        {
            Route.NavigateTo("/User/action/" + id);
        }
    }
}
