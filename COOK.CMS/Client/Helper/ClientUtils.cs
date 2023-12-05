using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using COOK.CMS.Client.Constants;

namespace COOK.CMS.Client.Helper
{
    public class ClientUtils
    {
        public static async Task<bool> ValidateForm(IJSRuntime Javascript)
        {
            bool result = await Javascript.InvokeAsync<bool>("onValid", ".form");
            return result;
        }

        public static string WWWRootUrl(string page)
        {
            return JSConstant.WWWRoot + page;
        }

        public static async Task<IJSObjectReference> ImportJS(IJSRuntime Javascript, string page)
        {
            return await Javascript.InvokeAsync<IJSObjectReference>("import", ClientUtils.WWWRootUrl(page));
        }
    }
}
