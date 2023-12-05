using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace COOK.CMS.Shared.ViewModels
{
    public class ResponseForm
    {
        public string Message { get; set; } = "";
        public int Status { get; set; } = 1;
        public dynamic Data { get; set; }
    }
}
