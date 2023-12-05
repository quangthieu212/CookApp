namespace EASY.COOK.Models
{
    public class BuyDetail
    {
        public long id { get; set; }
        public long buy_plan_id { get; set; }
        public long ingredient_id { get; set; }
        public decimal? quantity { get; set; }
        public decimal? actual_quantity { get; set; }
        public string? ingredient_status { get; set; }
    }
}