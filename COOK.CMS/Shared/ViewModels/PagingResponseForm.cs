using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace COOK.CMS.Shared.ViewModels
{
    public class PagingResponseForm
    {
        public string draw { get; set; }
        public long recordsFiltered { get; set; }
        public long recordsTotal { get; set; }
        public dynamic data { get; set; }
    }
}
