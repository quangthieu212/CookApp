using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace COOK.CMS.Client.Helper
{
    public static class IJSRuntimeExtension
    {
        public static async ValueTask Pagination(this IJSRuntime JSRuntime, string tableId)
        {
            await JSRuntime.InvokeVoidAsync("pagination", tableId);
        }
    }
}
