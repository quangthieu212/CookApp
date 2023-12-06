using System;

namespace COOK.CMS.Shared.Models
{
    public class Voucher : BaseModel
    {
        public string? vou_name { get; set; }
        public decimal? vou_value { get; set; }
        public decimal? vou_quantity { get; set; }
        public int? vou_type { get; set; }
        public DateTime? vou_end_date { get; set; }
    }
}
