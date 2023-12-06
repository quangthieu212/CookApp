namespace COOK.CMS.Shared.Models
{
    public class EatDetail
    {
        public long id { get; set; }
        public long eat_plan_id { get; set; }
        public long menu_id { get; set; }
        public decimal? quantity { get; set; }
        public decimal? actual_quantity { get; set; }
        public string? menu_status { get; set; }
    }
}