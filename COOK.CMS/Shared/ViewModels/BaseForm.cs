using System;

namespace COOK.CMS.Shared.ViewModels
{
    public class BaseForm
    {
        public long? id { get; set; }
        public DateTime? create_date { get; set; }
        public DateTime? update_date { get; set; }
    }
}
