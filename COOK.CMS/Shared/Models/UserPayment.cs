namespace COOK.CMS.Shared.Models
{
    public class UserPayment : BaseModel
    {
        public string? user_id { get; set; }
        public decimal? amount { get; set; }
        public string? pay_method { get; set; }
        public bool? pay_status { get; set; }
        public string? pay_description { get; set; }
        public string? vou_ids { get; set; }
    }
}
