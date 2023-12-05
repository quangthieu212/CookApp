using Microsoft.AspNetCore.Components;
using System.Threading.Tasks;

namespace COOK.CMS.Client.Pages
{
    public partial class Index
    {

        [Inject]
        private PageCommon _page { get; set; }

        public async Task Init()
        {
            //await JS.InvokeVoidAsync("initInputChooseForm");
            /*
            bool result = await JS.InvokeAsync<bool>("onValid", ".form");
            if (!result)
            {
                return;
            }
            */
        }
    }
}
