using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;


namespace COOK.CMS.Client.Pages
{
    public class PageCommon
    {
        public HttpClient Http { get; set; }
        public IJSRuntime JS { get; set; }
        public IJSObjectReference _module = null;
        public PageCommon(HttpClient _Http, IJSRuntime _JS)
        {
            this.Http = _Http;
            this.JS = _JS;
        }
        public async Task CallJS(string methodName,string[] param)
        {
            await JS.InvokeAsync<object>(methodName, param);
        }

        public async Task CallJS(string methodName)
        {
            await JS.InvokeVoidAsync(methodName);
        }

        public async Task InitSearchForm()
        {
            await CallJS("searchForm");
        }

        public async Task InitSearchList<TValue>(TValue t) where TValue : class
        {
            await CallJS("initList");
            DotNetObjectReference<TValue> objRef = DotNetObjectReference.Create(t);
            await JS.InvokeAsync<string>("initListAction", objRef);
        }

    }
}
