using System.Collections.Generic;
using System;
using System.Linq;
namespace COOK.CMS.Shared.Dtos.Requests
{
    public class RequestFilters : PaginationFilter
    {
        public string searchValue { get; set; }
        public List<Item> Filters { get; set; }

        public List<string> SortColumns { get; set; }
    }
    
    public class Item 
    {
        public Item(string _key, string _vaule)
        {
            key = _key;
            value = _vaule;
        }
        public string key { get; set;}
        public string value { get; set;}
    }
}