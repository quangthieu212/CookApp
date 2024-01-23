using COOK.CMS.Client.Helper;
using COOK.CMS.Shared.Dtos.Requests;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Threading.Tasks;



namespace COOK.CMS.Client.Pages.Users
{
    public partial class Action
    {
        [Parameter]
        public string Id { get; set; }
        private UserRequest user { get; set; } = new UserRequest();
        private List<Item> listType { get; set; } = new List<Item>();

        private bool isSaveProcess = false;
        private string headTitle = "Thêm mới người dùng";
        [Inject]
        private PageCommon _pageCommon { get; set; }
        private async Task ImportJS()
        {
            _pageCommon._module = await ClientUtils.ImportJS(Javascript, "Users.js");
            await _pageCommon._module.InvokeVoidAsync("ValidateForm");
        }
        public async Task Init()
        {
            //init for view
            listType.Add(new Item("Admin","0"));
            listType.Add(new Item("Supervisor", "1"));
            listType.Add(new Item("User", "2"));
            if (Id != null)
            {
                headTitle = "Cập nhật thông tin người dùng";
            }
        }


        public async Task Save()
        {
            isSaveProcess = true;
            if (!await ClientUtils.ValidateForm(Javascript))
            {
                isSaveProcess = false;
                return;
            }
            //create new customer
            //var response = await Apis.PostAsJsonAsync<UserRequest>("", user);
            //update customer
            //var response = await Apis.PutAsJsonAsync<UserRequest>("", user);
            Route.NavigateTo("/Users");
        }

        private void back()
        {
            Route.NavigateTo("/Users");
        }

    }
}
