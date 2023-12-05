using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace COOK.CMS.Business.Exceptions
{
    public class ErrorDetails
    {
        public string Uri { get; set; }
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
