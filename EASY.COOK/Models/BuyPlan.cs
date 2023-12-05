namespace EASY.COOK.Models
{
    public class BuyPlan : BaseModel
    {
        public string? buy_name { get; set; }
        public int? buy_type { get; set; }
        public string? buy_description { get; set; }
        public DateTime? buy_date { get; set; }
        public string buy_creater { get; set; }
        public bool? buy_status { get; set; }
    }
}
