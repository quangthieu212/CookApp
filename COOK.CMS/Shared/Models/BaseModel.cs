using System;

namespace COOK.CMS.Shared.Models
{
    public class BaseModel
    {
        public long? id { get; set; }
        public DateTime? create_date { get; set; }
        public DateTime? update_date { get; set; }
    }
}